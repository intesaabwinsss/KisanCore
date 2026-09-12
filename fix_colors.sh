#!/bin/bash
sed -i 's/--color-emerald-50: #fef7f4;/--color-emerald-50: #e8f5ec;/g' src/index.css
sed -i 's/--color-emerald-100: #fceee7;/--color-emerald-100: #d1ebd9;/g' src/index.css
sed -i 's/--color-emerald-200: #f9d5c6;/--color-emerald-200: #a3d7b3;/g' src/index.css
sed -i 's/--color-emerald-300: #f4b49a;/--color-emerald-300: #75c38d;/g' src/index.css
sed -i 's/--color-emerald-400: #ec8b64;/--color-emerald-400: #47af67;/g' src/index.css
sed -i 's/--color-emerald-500: #D4622A;/--color-emerald-500: #1A7A4A;/g' src/index.css
sed -i 's/--color-emerald-600: #BE5522;/--color-emerald-600: #156038;/g' src/index.css
sed -i 's/--color-emerald-700: #ae4730;/--color-emerald-700: #104a2b;/g' src/index.css
sed -i 's/--color-emerald-800: #8f3c2c;/--color-emerald-800: #0a331e;/g' src/index.css
sed -i 's/--color-emerald-900: #763628;/--color-emerald-900: #051d11;/g' src/index.css
sed -i 's/--color-emerald-950: #4a1f15;/--color-emerald-950: #020f09;/g' src/index.css

sed -i 's/Map Emerald to Terracotta (Primary)/Map Emerald to Jade (Primary)/g' src/index.css
sed -i 's/rgba(212, 98, 42, 0.4)/rgba(26, 122, 74, 0.4)/g' src/index.css

