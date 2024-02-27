import { NamingHelper, CSSHelper, ColorFormat, StringCase } from '@supernovaio/export-helpers';
import { Token, TokenGroup, TokenType } from '@supernovaio/sdk-exporters';

export function createTokens(
  tokens: Token[],
  tokenType: TokenType,
  mappedTokens: Map<string, Token>,
  tokenGroups: Array<TokenGroup>
): string {
  return tokens
    .map((token) => tokenToCSS(token, tokenType, mappedTokens, tokenGroups))
    .sort()
    .join('\n');
}

function tokenToCSS(token, tokenType, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  // First creating the name of the token, using helper function which turns any token name / path into a valid variable name
  const name = tokenVariableName(token, tokenType, tokenGroups);

  // Then creating the value of the token, using another helper function
  let value;
  switch (tokenType) {
    case TokenType.blur:
      value = CSSHelper.blurTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.border:
      value = CSSHelper.borderTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.color:
      value = CSSHelper.colorTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 2,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.dimension:
      value = CSSHelper.dimensionTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.typography:
      value = CSSHelper.typographyTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.gradient:
      value = CSSHelper.gradientTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 2,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.shadow:
      value = CSSHelper.shadowTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => {
          return '$' + tokenVariableName(t, tokenType, tokenGroups);
        },
      });
      break;
    case TokenType.size:
      value = CSSHelper.dimensionTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.fontWeight:
      value = CSSHelper.stringTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.fontFamily:
      value = CSSHelper.stringTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.letterSpacing:
      value = CSSHelper.dimensionTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.lineHeight:
      value = CSSHelper.dimensionTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;
    case TokenType.fontSize:
      value = CSSHelper.dimensionTokenValueToCSS(token.value, mappedTokens, {
        allowReferences: true,
        decimals: 3,
        colorFormat: ColorFormat.smartHashHex,
        tokenToVariableRef: (t) => '$' + tokenVariableName(t, tokenType, tokenGroups),
      });
      break;

    default:
      throw new Error('Token type ' + tokenType + ' not defined');
  }

  return `$${name}: ${value};`;
}

function tokenVariableName(token, tokenType: string, tokenGroups: Array<TokenGroup>): string {
  const parent = tokenGroups.find((group) => group.id === token.parentGroupId)!;

  return NamingHelper.codeSafeVariableNameForToken(token, StringCase.paramCase, parent, tokenType);
}
