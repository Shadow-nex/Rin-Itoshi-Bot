#!/bin/bash

# ====== COLORES ======
RED="\033[1;31m"
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
BLUE="\033[1;34m"
MAGENTA="\033[1;35m"
CYAN="\033[1;36m"
WHITE="\033[1;37m"
ORANGE="\033[38;5;208m"
PINK="\033[38;5;213m"
RESET="\033[0m"

# ====== FUNCIONES ======
beep() {
    echo -ne "\007"
    tput bel 2>/dev/null || true
}

loading() {
    msg=$1
    echo -ne " ${msg}"
    for i in {1..3}; do
        echo -ne "."
        sleep 0.4
    done
    echo -e "${RESET}"
    beep
}

typewriter() {
    text=$1
    for (( i=0; i<${#text}; i++ )); do
        echo -ne " ${text:$i:1}${RESET}"
        sleep 0.03
    done
    echo ""
}

progress_bar() {
    msg=$1
    echo -e "${MAGENTA}${msg}${RESET}\n"
    bar="===================="
    for i in $(seq 1 20); do
        echo -ne " [ ${bar:0:i}${WHITE}${bar:i}] $((i*5))% \r"
        sleep 0.08
    done
    echo -e "\n ✔ Completado${RESET}\n"
    beep
    sleep 0.3
}

spinner() {
    msg=$1
    spin='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    echo -ne "${ORANGE}${msg} "
    i=0
    while kill -0 $! 2>/dev/null; do
        i=$(( (i+1) %10 ))
        printf "\r${PINK}${msg} ${spin:$i:1}${RESET}"
        sleep 0.1
    done
    echo ""
    beep
}

progress_gitpush() {
    echo -e "${MAGENTA}⭐ Subiendo archivos a GitHub....${RESET}"
    total_steps=6
    step=0
    git push -u origin main 2>&1 | while read -r line; do
        if [[ "$line" =~ (Counting|Compressing|Writing|Delta|Total|Receiving) ]]; then
            step=$((step + 1))
            percent=$(( step * 100 / total_steps ))
            filled=$(( percent / 5 ))
            empty=$(( 20 - filled ))
            bar=$(printf "%${filled}s" | tr ' ' '█')$(printf "%${empty}s")
            printf " [%-20s] %3d%%${RESET} ${WHITE}%s${RESET}\r" "$bar" "$percent" "$line"
        fi
    done
    echo -e "\n ✔ Push completado con éxito${RESET}"
    beep
}

banner() {
    clear
    echo -e "${MAGENTA}"
    echo "╔═════════════════════════════════════════════╗"
    echo "║                                                     ║"
    echo "║    ██████╗  ██╗████████╗ ██╗  ██╗ ██████╗   ║"
    echo "║   ██╔═══██╗ ██║╚══██╔══╝ ██║  ██║ ██╔══██╗  ║"
    echo "║   ██║   ██║ ██║   ██║    ███████║ ██████╔╝  ║"
    echo "║   ██║▄▄ ██║ ██║   ██║    ██╔══██║ ██╔═══╝   ║"
    echo "║   ╚██████╔╝ ██║   ██║    ██║  ██║ ██║       ║"
    echo "║    ╚══▀▀═╝  ╚═╝   ╚═╝    ╚═╝  ╚═╝ ╚═╝       ║"
    echo "║                                                    ║"
    echo "║        💔 POWERED BY SHADOW.XYZ ⭐                 ║"
    echo "╚════════════════════════════════════════════╝"
    echo -e "${RESET}"
    beep
}

separator() {
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
}

epic_finish() {
    echo -e "${GREEN}"
    echo "╔═══════════════════════════════════════╗"
    echo "║    ✅ INSTALACIÓN FINALIZADA CON ÉXITO ║"
    echo "╠═══════════════════════════════════════╣"
    echo "║   🌍 Repositorio subido a GitHub 🚀    ║"
    echo "║   ✨ Gracias por usar Shadow.xyz ✨     ║"
    echo "╚═══════════════════════════════════════╝"
    echo -e "${RESET}"
    beep

    # 🔥 Mensaje extra
    separator
    typewriter "🌟 Proyecto listo para la acción! 🌟"
    echo -e "${CYAN}👉 Recuerda: seguirme en mi gituhb https://github.com/Yuji-XDev/${RESET}"
    echo -e "${ORANGE}⚡ Shadow.xyz 💥${RESET}"
    separator
    beep
}

# ====== INICIO ======
banner
typewriter "✨ Bienvenido al instalador mágico de Shadow.xyz ✨"
loading "⚽ Preparando entorno"
sleep 0.5

echo ""
read -p "🍂 Ruta de la carpeta: " folder_path
read -p "🌱 URL del repositorio (https://github.com/usuario/repositorio.git): " repo_url

if [ ! -d "$folder_path" ]; then
  echo -e "${RED}Error: Carpeta no encontrada.${RESET}"
  beep
  exit 1
fi

cd "$folder_path" || exit

progress_bar "⚙️ Añadiendo directorio seguro"
git config --global --add safe.directory "$folder_path"

if [ ! -d ".git" ]; then
  progress_bar "📂 Inicializando repositorio"
  git init &>/dev/null
fi

progress_bar "📦 Agregando archivos"
git add . &>/dev/null

read -p "☘️ Mensaje del commit: " commit_message
progress_bar "📝 Realizando commit"
git commit -m "$commit_message" &>/dev/null

progress_bar "🌱 Configurando rama main"
git branch -M main &>/dev/null

progress_bar "🔗 Configurando remoto"
git remote add origin "$repo_url" &>/dev/null

(progress_gitpush) & spinner "⏳ Procesando push....."
wait

epic_finish
