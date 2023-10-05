import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
     <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
           WorldWise allows travelers to map their journeys and share their experiences. Users can easily add new destinations they've visited using map APIs and provide insights through narratives,  It's a unique platform where wanderlust meets storytelling, inspiring others to explore the world. Join WorldWise today and be part of a global community of travelers.
          </p>
        </div>
      </section>
    </main>
  );
}
