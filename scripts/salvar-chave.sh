#!/bin/zsh
# Salva a chave do Gemini em .env.local (arquivo ignorado pelo git). A chave não aparece na tela.
cd "$HOME/code/mare" || exit 1
echo ""
echo "Cole a chave do Gemini (ela não vai aparecer enquanto você cola) e aperte Enter:"
read -rs CHAVE
if [[ -z "$CHAVE" ]]; then
  echo "Nada foi colado. Rode de novo."
  exit 1
fi
printf 'GEMINI_API_KEY=%s\n' "$CHAVE" > .env.local
chmod 600 .env.local
unset CHAVE
echo "✅ Chave salva. Pode voltar pro chat e avisar o Claude."
