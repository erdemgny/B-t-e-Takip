# GitHub Actions ile Bulutta APK — Kurulum

Bilgisayarına hiçbir şey kurmadan, push edince bulutta debug APK üretir ve indirirsin.

## 1) Repo dosya yerleşimi

GitHub'da boş bir depo aç ve dosyaları **tam şu konumlara** koy:

```
butce-takibi/
├── .github/
│   └── workflows/
│       └── android.yml          ← (android.yml dosyası)
├── index.html
├── package.json
├── vite.config.js
├── capacitor.config.ts
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx                  ← (mevcut App.jsx)
    └── lib/
        └── db.js                ← (mevcut db.js)
```

> Dikkat: `android.yml` mutlaka `.github/workflows/` altına, `App.jsx` → `src/App.jsx`, `db.js` → `src/lib/db.js` olacak.
> `BudgetTracker.jsx` (önizleme) repoya **gerekmez** — o yalnızca claude.ai önizlemesi içindi. Üretim `src/App.jsx`'tir.

## 2) Push et

```bash
git init
git add .
git commit -m "Budget tracker — ilk sürüm"
git branch -M main
git remote add origin https://github.com/KULLANICI/butce-takibi.git
git push -u origin main
```

## 3) APK'yı al

1. GitHub'da depo → **Actions** sekmesi.
2. "Android Debug APK" işi otomatik başlar (push ile). Elle de: **Run workflow**.
3. İş bitince (~5–10 dk; ilk seferde SDK/Gradle indirdiği için daha uzun) → çalışmaya tıkla → en altta **Artifacts → app-debug-apk** → indir.
4. Zip'ten çıkan `app-debug.apk`'yi telefona at, "bilinmeyen kaynaklar"a izin verip kur.

## Notlar

- Bu **debug** APK'dir: test için kurulabilir, Play Store için değil. Mağaza sürümü için imzalı **release** APK gerekir (bkz. `02_CLAUDE_CODE_CAPACITOR_BUILD.md` → keystore).
- `android/` klasörünü repoya koymadın; workflow ilk çalıştırmada `npx cap add android` ile üretir. İstersen yerelde bir kez üretip commit'leyebilirsin (derleme biraz hızlanır).
- Splash görseli/ikon koymadıysan varsayılan ikon kullanılır. Premium ikon için `04_NATIVE_BUILD.md` → "Uygulama ikonu" (`@capacitor/assets`).
- Native özellikler (biyometri, bildirim, dosya yedeği, haptik, PDF paylaşımı) yalnızca bu APK'da çalışır; tarayıcı önizlemesinde değil.
- AI: `src/App.jsx` içinde `AI_PROXY_URL` boş olduğundan native'de AI butonu gizli. Proxy kurunca o sabite URL yaz.

## Sık sorun

| Sorun | Çözüm |
|------|------|
| Build "cannot resolve '@capacitor/...'" | `package.json`'daki bağımlılıklar eksik/yanlış konumda. Dosyayı kök dizine koy. |
| `npx cap add android` hata | `capacitor.config.ts` kökte mi, `@capacitor/android` yüklü mü kontrol et. |
| Gradle "SDK location not found" | `android-actions/setup-android` adımı çalışmış mı bak; workflow'u tekrar tetikle. |
| APK kurulmuyor | Telefonda "bilinmeyen kaynaklardan kurulum" iznini aç. |
