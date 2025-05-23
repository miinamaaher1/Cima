# CIMA

![Logo](Front-End\movies-streaming-app\public\screenshots\CIMA.png)

**CIMA** is a sleek, front-end focused streaming platform inspired by Netflix, offering a seamless experience for browsing, watching, and managing media content. While the application uses a minimal backend for user and list management, it leverages the power of the **TMDB API** to handle all movie-related data and logic.

Built as part of the [ITI](https://iti.gov.eg/home) Angular course under the Integrated Software Development & Architecture track, combining **Angular** and **.NET 9** to deliver a modern streaming app experience.

Visit deployed version at [CIMA](cima-zeta.vercel.app)

---

## Team

* [@miinamaaher1](https://github.com/miinamaaher1)
* [@abdelrahmanramadan12](https://github.com/abdelrahmanramadan12)
* [@ahmed-elshamy23](https://github.com/ahmed-elshamy23)
* [@MahmoudRKeshk](https://github.com/MahmoudRKeshk)
* [@MohamedKhaled999](https://github.com/MohamedKhaled999)

---

## Tech Stack

| Tech         | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| **Angular**  | Component-based SPA with routing, RxJS observables, signals, and lazy loading   |
| **.NET 9**   | RESTful API for user management and subscriptions                    |
| **TMDB API** | Dynamic movie and series data (posters, metadata, trailers, etc.)    |
| **JWT Auth** | Secure token-based login and session handling                        |

---

## Features

### Dynamic Home & Hero Section

![Home Page](Front-End\movies-streaming-app\public\screenshots\01-home.png)

* Showcases trending media fetched from TMDB
* Fully responsive with animated transitions

---

### Authentication & Security

![Login](Front-End\movies-streaming-app\public\screenshots\00-signin.png)

* JWT-based login with session persistence
* Secure role-based access (User/Admin)

---

### Rich Media Experience

![Details](Front-End\movies-streaming-app\public\screenshots\05-details.png)

* Infinite scroll & carousel for smooth discovery
* Detailed views with trailers, cast, similar titles
* Episode browsing with season navigation and bookmarking
* Custom media player

---

### Fully Responsive & Mobile Friendly

<p>
  <img src="Front-End\movies-streaming-app\public\screenshots\11-home-phone.png" width="30%" alt ="home"/>
  <img src="Front-End\movies-streaming-app\public\screenshots\13-infinite-scroll-phone.png" width="30%" alt="scroll" />
  <img src="Front-End\movies-streaming-app\public\screenshots\14-nav-phone.png" width="30%" alt="nav" />
</p>

* Optimized for mobile devices
* Adaptive navigation and layouts

---

### Admin Features & Media Management

![Admin Dashboard](Front-End\movies-streaming-app\public\screenshots\08-analytics.png)

* Dashboard with analytics on content and users
* Upload new media with full metadata
* Toggle visibility, manage categories and titles

---

## Setup Steps

1. **Clone the Repository**

   ```sh
   git clone https://github.com/miinamaaher1/CIMA
   cd CIMA
   ```

2. **Frontend Setup**

   * Navigate to the Angular project:

     ```sh
     cd CIMA.Frontend
     ```

   * Install dependencies:

     ```sh
     npm install
     ```

   * Add your TMDB API key in the environment file:

     ```ts
     // environment.ts
     export const environment = {
       tmdbApiKey: 'YOUR_TMDB_API_KEY'
     };
     ```

3. **Backend Setup**

   * Navigate to the API project:

     ```sh
     cd CIMA.API
     ```

   * Configure your database connection and TMDB base URLs in `appsettings.json`.
   * Restore and run the backend:

     ```sh
     dotnet restore
     dotnet run
     ```

4. **Run the Frontend**

   ```sh
   ng serve
   ```

   * Open `http://localhost:4200` to view the app.

---

## License

This project is licensed under the MIT License.
