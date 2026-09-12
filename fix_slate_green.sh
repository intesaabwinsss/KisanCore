#!/bin/bash
sed -i 's/--color-slate-50: #FFFDF9; \/\* elevated \*\//--color-slate-50: #F4FBF7; \/\* elevated \*\//g' src/index.css
sed -i 's/--color-slate-100: #FAF6F0; \/\* surface \*\//--color-slate-100: #E6F5EC; \/\* surface \*\//g' src/index.css
sed -i 's/--color-slate-200: #F5EFE6; \/\* base \*\//--color-slate-200: #D0EBE0; \/\* base \*\//g' src/index.css
sed -i 's/--color-slate-300: #EDE5D8; \/\* inset \*\//--color-slate-300: #AFD8C8; \/\* inset \*\//g' src/index.css
sed -i 's/--color-slate-400: #E4D3B8; \/\* muted \*\//--color-slate-400: #88BBA7; \/\* muted \*\//g' src/index.css
sed -i 's/--color-slate-500: #9C8570; \/\* tertiary text \*\//--color-slate-500: #669B86; \/\* tertiary text \*\//g' src/index.css
sed -i 's/--color-slate-600: #6B5540; \/\* secondary text \*\//--color-slate-600: #4B7C69; \/\* secondary text \*\//g' src/index.css
sed -i 's/--color-slate-700: #503214; \/\* strong border \*\//--color-slate-700: #3C6354; \/\* strong border \*\//g' src/index.css
sed -i 's/--color-slate-800: #2C1810;/--color-slate-800: #325044;/g' src/index.css
sed -i 's/--color-slate-900: #1C120A; \/\* primary text \*\//--color-slate-900: #294239; \/\* primary text \*\//g' src/index.css
sed -i 's/--color-slate-950: #18100A;/--color-slate-950: #162620;/g' src/index.css

sed -i 's/Map Slate to Warm Parchment \/ Earth Grays/Map Slate to Cool Green-Gray/g' src/index.css

sed -i 's/--shadow-xs: 0 1px 2px rgba(44, 24, 8, 0.08);/--shadow-xs: 0 1px 2px rgba(22, 38, 32, 0.08);/g' src/index.css
sed -i 's/--shadow-sm: 0 1px 2px rgba(44, 24, 8, 0.09), 0 4px 16px rgba(44, 24, 8, 0.07);/--shadow-sm: 0 1px 2px rgba(22, 38, 32, 0.09), 0 4px 16px rgba(22, 38, 32, 0.07);/g' src/index.css
sed -i 's/--shadow-md: 0 2px 4px rgba(44, 24, 8, 0.09), 0 8px 28px rgba(44, 24, 8, 0.09);/--shadow-md: 0 2px 4px rgba(22, 38, 32, 0.09), 0 8px 28px rgba(22, 38, 32, 0.09);/g' src/index.css
sed -i 's/--shadow-lg: 0 4px 8px rgba(44, 24, 8, 0.09), 0 16px 52px rgba(44, 24, 8, 0.11);/--shadow-lg: 0 4px 8px rgba(22, 38, 32, 0.09), 0 16px 52px rgba(22, 38, 32, 0.11);/g' src/index.css
sed -i 's/--shadow-xl: 0 8px 16px rgba(44, 24, 8, 0.10), 0 32px 80px rgba(44, 24, 8, 0.12);/--shadow-xl: 0 8px 16px rgba(22, 38, 32, 0.10), 0 32px 80px rgba(22, 38, 32, 0.12);/g' src/index.css
sed -i 's/Warm tinted shadows/Cool green-gray shadows/g' src/index.css

