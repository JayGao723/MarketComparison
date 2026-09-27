<template>
  <div class="page">
    <section class="page-hero">
      <div class="page-wrap">
        <div class="breadcrumb"><router-link to="/">Home</router-link> / Data information</div>
        <h1 class="page-title">How MarketMate compares prices</h1>
        <p class="page-lead">Clear rules for store selection, product matching, freshness and unavailable products.</p>
      </div>
    </section>
    <section class="page-wrap grid">
      <article class="panel card">
        <h3>Price freshness</h3>
        <p>Every offer shows when it was last checked. Prices older than 24 hours are marked “Price may have changed” and are not labelled as the lowest.</p>
        <div><span>1</span><div><strong>Collect</strong><p>Read publicly available prices for the selected local branch.</p></div></div>
        <div><span>2</span><div><strong>Normalize</strong><p>Standardise size, quantity and unit-price information.</p></div></div>
        <div><span>3</span><div><strong>Compare</strong><p>Rank equivalent products without hiding unavailable stores.</p></div></div>
      </article>
      <article class="panel card">
        <h3>Product matching</h3>
        <p>Exact products are matched using brand, product name, pack size and barcode where available. Similar alternatives are always labelled separately.</p>
        <div><span>✓</span><div><strong>Same product</strong><p>Brand, variant and pack size match across stores.</p></div></div>
        <div><span>≈</span><div><strong>Comparable alternative</strong><p>A close substitute, shown only when the exact product is missing.</p></div></div>
        <div><span>!</span><div><strong>Unavailable</strong><p>Kept visible so basket totals do not appear artificially low.</p></div></div>
      </article>
    </section>
    <div class="page-wrap more"><router-link to="/states">View interface states →</router-link></div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 28px; }
.card { padding: 24px; }
.card > p, .card div p { color: #547066; }
.card div { display: flex; gap: 12px; margin-top: 14px; }
.card span { width: 28px; height: 28px; border-radius: 50%; background: #e7f4ec; color: #176b4b; display: grid; place-items: center; flex-shrink: 0; }
.more { margin-top: 24px; }
.more a { color: #176b4b; font-weight: 700; text-decoration: none; }
@media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
</style>
