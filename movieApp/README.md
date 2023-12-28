# Film Uygulaması

Bu proje, film verilerini görüntülemek ve aramak için kullanılan bir React Native uygulamasıdır. TMDB API'si, uygulamada kullanılan film bilgilerini sağlar.

## Amaç

Bu uygulamanın temel amacı, kullanıcılara popüler filmleri inceleme, en çok beklenen filmleri gözden geçirme ve arama yapma imkanı sunmaktır.

## Kullanılan Kütüphaneler

Bu proje, aşağıdaki ana kütüphaneleri kullanmaktadır:

- **Redux Toolkit:** State yönetimi için kullanılmaktadır.
- **React Navigation:** Ekran yönetimi ve gezinme için kullanılmaktadır.
- **Axios:** HTTP istekleri yapmak için kullanılmaktadır.
- **React Native Heroicons:** UI için ikonlar sağlamak için kullanılmaktadır.
- **Iconsax-React:** Özel ikonlar kullanmak için kullanılmaktadır.
- **React Native Linear Gradient:** Arka plana gradient eklemek için kullanılmaktadır.

## Ekranlar

### Ana Ekran

Ana ekranda kullanıcılar aşağıdaki sekmeler arasında gezinebilirler:

- **Trending:** Popüler filmleri görüntüleme.
- **Upcoming:** Gelecek filmleri inceleme.
- **Top Rated:** En iyi puan alan filmleri görüntüleme.

### Arama Ekranı

Arama ekranında kullanıcılar istedikleri bir filmi arayabilirler.

## Nasıl Kullanılır

Projeyi klonlayın ve aşağıdaki adımları takip edin:

1. Projeyi klonlayın:

   ```bash
   git clone https://github.com/kullaniciadi/film-uygulamasi.git
   ```

2. Proje klasörüne gidin:

   ```bash
   cd film-uygulamasi
   ```

3. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

4. Projeyi başlatın:

   ```bash
   npx react-native run-android
   ```

   veya

   ```bash
   npx react-native run-ios
   ```

5. Uygulamayı kullanın:

   - Ana ekran üzerindeki "Trending" bölümünde popüler filmleri görebilirsiniz.
   - "Upcoming" bölümünde gelecek filmleri inceleyebilirsiniz.
   - "Top Rated" sekmesinde en iyi puan alan filmleri görebilirsiniz.
   - Arama ikonuna tıklayarak istediğiniz bir filmi arayabilirsiniz.

## Gif

![Proje Ekran Görüntüsü](/src/assetes/screen.gif)
