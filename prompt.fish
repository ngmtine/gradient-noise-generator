#!/usr/bin/fish

set OUTPUT_FILE "prompt.txt"

# wsl判定
function is_wsl
    test -e /proc/sys/fs/binfmt_misc/WSLInterop
end

# ヤンク関数
function yank
    if is_wsl
        win32yank.exe -i
    else
        xsel --input --clipboard
    end
end

# aiに投げる文字列生成
echo "" > $OUTPUT_FILE

echo "背景コンポーネントを作成するためのwebアプリケーションをnext.jsで作成します" >> $OUTPUT_FILE
echo "要件は以下の通りです" >> $OUTPUT_FILE
cat ./reqdef.md >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo "現在の実装は以下の通りです" >> $OUTPUT_FILE

git ls-files | grep -E -v \
    -e '\.gitignore$' \
    -e '\.ico$' \
    -e 'prompt\.fish$' \
    -e 'package-lock\.json$' \
    -e 'readme\.md$' \
    -e 'reqdef\.md$' \
    | xargs -I _ fish -c "nya _" >> $OUTPUT_FILE

echo "---" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# ヤンク
cat $OUTPUT_FILE | yank
