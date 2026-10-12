# Load baseline

Measured 2026-10-11T03:06:33.278Z with `npm run perf -- --baseline`.
Profile `mid-4g`: mid-range Android, typical 4G (RTT 150 ms, 9000 Kbps, CPU slowdown 4x). Median of 5 runs per route, first visit, empty cache.
Measuring machine CPU benchmark index: 2780. Compare numbers only between runs on similar machines.
Budget: LCP <= 1000 ms. This is report-only for now; a later ticket turns it into a failing check.

| Route | LCP median (ms) | min-max | FCP (ms) | TBT (ms) | Transfer (KB) | Requests | LCP element | Budget |
|---|---:|---:|---:|---:|---:|---:|---|:--:|
| home | 1821 | 1759-1942 | 1493 | 9 | 1098 | 30 | `section#home > div.mx-auto > div > p.mt-6` | over |
| about | 1691 | 1657-1746 | 1471 | 34 | 177 | 14 | `section.py-24 > div.mx-auto > div.max-w-4xl > h1.text-4xl` | over |
| impact | 1910 | 1846-1946 | 1475 | 17 | 399 | 17 | `div.grid > div.rounded-2xl > div.aspect-[16/9] > img.h-full` | over |
| impact-detail | 2041 | 1927-2123 | 1475 | 29 | 397 | 17 | `section.py-24 > div.mx-auto > figure.mt-10 > img.aspect-[16/` | over |
| events | 1835 | 1647-1944 | 1459 | 25 | 189 | 15 | `main.relative > section.py-24 > div.mx-auto > p.mt-6` | over |
| event-detail | 2017 | 1802-2152 | 1451 | 34 | 417 | 16 | `section.py-24 > div.mx-auto > figure.mt-10 > img.aspect-[16/` | over |
| get-involved | 1563 | 1528-1602 | 1394 | 32 | 146 | 12 | `section.py-24 > div.mx-auto > div.max-w-3xl > p.mt-6` | over |
| resources | 1823 | 1627-1854 | 1466 | 53 | 194 | 15 | `main.relative > section.py-24 > div.mx-auto > p.mt-6` | over |
| resource-detail | 1852 | 1818-1957 | 1468 | 47 | 371 | 16 | `section.py-24 > div.mx-auto > figure.mt-10 > img.aspect-[16/` | over |
| press-kit | 1573 | 1558-1629 | 1408 | 33 | 144 | 12 | `div.mx-auto > div.grid > div > p.mt-4` | over |
| contact | 1584 | 1558-1596 | 1398 | 23 | 146 | 13 | `section.py-24 > div.mx-auto > div.max-w-3xl > p.mt-6` | over |
| privacy | 1563 | 1545-1644 | 1384 | 21 | 144 | 12 | `section.py-24 > div.mx-auto > div.max-w-3xl > p.mt-6` | over |
| not-found | 1660 | 1624-1683 | 1461 | 22 | 174 | 12 | `div.relative > div.mb-16 > div.col-span-1 > p.mb-8` | over |
