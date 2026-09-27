<template>
  <div class="page">
    <section class="page-hero">
      <div class="page-wrap">
        <div class="breadcrumb"><router-link to="/">Home</router-link> / Interface states</div>
        <h1 class="page-title">Search and data states</h1>
        <p class="page-lead">Reusable states for loading, empty results, connection problems and uncertain stock.</p>
      </div>
    </section>
    <section class="page-wrap grid">
      <article class="panel card">
        <h3>Loading results</h3>
        <div class="bar wide"></div>
        <div class="bar"></div>
        <div class="bar wide"></div>
      </article>
      <article class="panel card">
        <h3>No results</h3>
        <p>Keep the selected supermarket and category filters, then suggest a broader product name.</p>
        <router-link to="/compare?q=milk">Clear search</router-link>
      </article>
      <article class="panel card">
        <h3>Connection problem</h3>
        <p>We couldn’t refresh prices. Existing list items remain saved locally and the customer can retry.</p>
        <button type="button">Try again</button>
      </article>
      <article class="panel card">
        <span class="tag">Price may have changed</span>
        <h3>Stale price</h3>
        <p>Last checked more than 24 hours ago. This offer remains visible but is excluded from the lowest-price badge.</p>
      </article>
      <article class="panel card">
        <span class="tag danger">Out of stock</span>
        <h3>Unavailable product</h3>
        <p>Show the other two stores and a clearly labelled comparable alternative instead of hiding the item.</p>
      </article>
      <article class="panel card">
        <h3>Empty shopping list</h3>
        <p>Products are saved locally and no login is required.</p>
        <router-link to="/compare">Find products</router-link>
      </article>
    </section>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 28px; }
.card { padding: 22px; }
p { color: #547066; }
.bar { height: 14px; border-radius: 8px; background: #e7f4ec; margin-top: 10px; width: 70%; }
.bar.wide { width: 100%; }
a, button { border: 0; background: #176b4b; color: #fff; border-radius: 999px; padding: 8px 14px; text-decoration: none; cursor: pointer; }
.tag { display: inline-block; background: #fff4d6; color: #8a6a12; border-radius: 999px; padding: 4px 8px; font-size: 12px; }
.tag.danger { background: #fde8ea; color: #c41e3a; }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
</style>
