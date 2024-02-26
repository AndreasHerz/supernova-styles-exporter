import { NamingHelper, CSSHelper, ColorFormat, StringCase } from '@supernovaio/export-helpers';
import { GradientToken, Token, TokenGroup } from '@supernovaio/sdk-exporters';

export function createGradients(
  tokens: GradientToken[],
  mappedTokens: Map<string, Token>,
  tokenGroups: Array<TokenGroup>
): string {
  return tokens.map((token) => gradientTokenToSCSS(token as GradientToken, mappedTokens, tokenGroups)).join('\n');
}

function gradientTokenToSCSS(
  token: GradientToken,
  mappedTokens: Map<string, Token>,
  tokenGroups: Array<TokenGroup>
): string {
  // First creating the name of the token, using helper function which turns any token name / path into a valid variable name
  const name = tokenVariableName(token, tokenGroups);

  // Then creating the value of the token, using another helper function
  const value = CSSHelper.gradientTokenValueToCSS(token.value, mappedTokens, {
    allowReferences: true,
    decimals: 2,
    colorFormat: ColorFormat.smartHashHex,
    tokenToVariableRef: (t) => {
      return '$' + tokenVariableName(t, tokenGroups);
    },
  });

  return `$${name}: ${value};`;
}

function tokenVariableName(token: Token, tokenGroups: Array<TokenGroup>): string {
  const parent = tokenGroups.find((group) => group.id === token.parentGroupId)!;
  return NamingHelper.codeSafeVariableNameForToken(token, StringCase.paramCase, parent, 'gradient');
}
