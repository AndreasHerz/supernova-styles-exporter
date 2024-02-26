import { NamingHelper, CSSHelper, ColorFormat, StringCase } from '@supernovaio/export-helpers';
import { ShadowToken, Token, TokenGroup } from '@supernovaio/sdk-exporters';

export function createShadows(
  tokens: ShadowToken[],
  mappedTokens: Map<string, Token>,
  tokenGroups: Array<TokenGroup>
): string {
  return tokens.map((token) => shadowTokenToSCSS(token as ShadowToken, mappedTokens, tokenGroups)).join('\n');
}

function shadowTokenToSCSS(
  token: ShadowToken,
  mappedTokens: Map<string, Token>,
  tokenGroups: Array<TokenGroup>
): string {
  // First creating the name of the token, using helper function which turns any token name / path into a valid variable name
  const name = tokenVariableName(token, tokenGroups);

  // Then creating the value of the token, using another helper function
  const value = CSSHelper.shadowTokenValueToCSS(token.value, mappedTokens, {
    allowReferences: true,
    decimals: 1,
    colorFormat: ColorFormat.smartRgba,
    tokenToVariableRef: (t) => {
      return '$' + tokenVariableName(t, tokenGroups);
    },
  });

  return `$${name}: ${value};`;
}

function tokenVariableName(token: Token, tokenGroups: Array<TokenGroup>): string {
  const parent = tokenGroups.find((group) => group.id === token.parentGroupId)!;
  return NamingHelper.codeSafeVariableNameForToken(token, StringCase.paramCase, parent, 'shadow');
}
