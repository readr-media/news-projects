<template>
  <div class="latest-news">
    <div class="latest-news__container">
      <readr-latest-coverages />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
.latest-news {
  margin: auto;
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.latest-news__container{
  max-width: 600px;
}

.latest-news__title {
  background: rgb(224, 232, 254);
  display: block;
  padding: 14px 0 12px;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 800;
  color: rgb(0, 39, 84);
  margin-bottom: 14px;
}
</style>
