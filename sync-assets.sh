#!/bin/bash
# Копирует CSS, JS, картинки и шрифты с соседнего сайта на этом же сервере.
# Запуск на сервере: bash sync-assets.sh

SRC="/var/www/vodokonal64.ru"
DST="/var/www/vodokanal48"

if [ ! -d "$SRC" ]; then
  SRC="/var/www/vodokanal64"
fi

if [ ! -d "$SRC" ]; then
  echo "Не найдена папка vodokonal64: $SRC"
  exit 1
fi

for dir in css js img images fonts assets; do
  if [ -d "$SRC/$dir" ]; then
    cp -r "$SRC/$dir" "$DST/"
    echo "OK: $dir"
  else
    echo "SKIP: $dir (нет в $SRC)"
  fi
done

# Локальный logo-custom.css не перезаписываем
if [ -f "$DST/css/logo-custom.css" ]; then
  echo "logo-custom.css оставлен локальный"
fi

echo "Готово. Проверь: ls -la $DST/css/"
