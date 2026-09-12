#!/bin/bash
file="src/components/government/GovernmentKPIGrid.tsx"

perl -0777 -pi -e 's/(id="kpi-card-farmers".*?)bg-gradient-to-br from-white\/80 via-slate-50\/50 to-emerald-50\/40/$1bg-gradient-to-br from-emerald-50\/50 via-white\/70 to-slate-50\/80/s' $file
perl -0777 -pi -e 's/(id="kpi-card-buyers".*?)bg-gradient-to-br from-white\/80 via-slate-50\/50 to-emerald-50\/40/$1bg-gradient-to-br from-blue-50\/50 via-white\/70 to-slate-50\/80/s' $file
perl -0777 -pi -e 's/(id="kpi-card-transactions".*?)bg-gradient-to-br from-white\/80 via-slate-50\/50 to-emerald-50\/40/$1bg-gradient-to-br from-indigo-50\/50 via-white\/70 to-slate-50\/80/s' $file
perl -0777 -pi -e 's/(id="kpi-card-intermediaries".*?)bg-gradient-to-br from-white\/80 via-slate-50\/50 to-emerald-50\/40/$1bg-gradient-to-br from-amber-50\/50 via-white\/70 to-slate-50\/80/s' $file
perl -0777 -pi -e 's/(id="kpi-card-produce-traded".*?)bg-gradient-to-br from-white\/80 via-slate-50\/50 to-emerald-50\/40/$1bg-gradient-to-br from-purple-50\/50 via-white\/70 to-slate-50\/80/s' $file

