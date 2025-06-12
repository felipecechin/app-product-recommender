// getRecommendations.js

const getRecommendations = (() => {
  // WeakMap: referência do array de produtos → phraseProductMap
  const catalogCache = new WeakMap();

  return function getRecommendations(formData = {}, products = []) {
    /* ==============================================================
     * 1. Recupera ou monta o índice (apenas 1× para cada array)
     * ============================================================== */
    let phraseProductMap = catalogCache.get(products);

    if (!phraseProductMap) {
      phraseProductMap = new Map(); // frase completa → objeto-produto

      products.forEach(product => {
        [...product.features, ...product.preferences].forEach(phrase =>
          phraseProductMap.set(phrase, product)
        );
      });

      catalogCache.set(products, phraseProductMap);
    }

    /* ==============================================================
     * 2. Normaliza dados vindos do formulário
     * ============================================================== */
    const {
      selectedPreferences: rawPreferences = [],
      selectedFeatures: rawFeatures = [],
      selectedRecommendationType: recommendationType = '',
    } = formData || {};

    if (recommendationType === '') {
      throw new Error('Tipo de recomendação não especificado');
    }

    if (recommendationType !== 'SingleProduct' && recommendationType !== 'MultipleProducts') {
      throw new Error('Tipo de recomendação inválido');
    }

    const preferences = Array.isArray(rawPreferences) ? rawPreferences : [];
    const features = Array.isArray(rawFeatures) ? rawFeatures : [];
    const singleMode = recommendationType === 'SingleProduct';

    /* ==============================================================
     * 3. Pontua cada produto conforme matches
     * ============================================================== */
    const scores = new Map(); // id → { product, score }
    let topScore = 0; // usado para o desempate no modo SingleProduct
    let chosenProduct = null; // usado para o desempate no modo SingleProduct

    const bumpScore = phrase => {
      const product = phraseProductMap.get(phrase);
      if (!product) return;

      const { id } = product;
      const entry = scores.get(id) || { product, score: 0 };
      entry.score += 1;
      scores.set(id, entry);

      if (singleMode) {
        const appearsLater = entry.score === topScore && id > (chosenProduct?.id ?? -1);

        // Se o score é maior ou aparece depois, escolhe este produto
        if (entry.score > topScore || appearsLater) {
          topScore = entry.score;
          chosenProduct = product;
        }
      }
    };

    features.forEach(bumpScore);
    preferences.forEach(bumpScore);

    /* ==============================================================
     * 4. Retorna resultados conforme o tipo solicitado
     * ============================================================== */
    if (singleMode) {
      return topScore === 0 ? [] : [chosenProduct];
    }

    // MultipleProducts: ordena por score decrescente e retorna só produtos
    return [...scores.values()]
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.product);
  };
})();

const recommendationService = { getRecommendations };
export default recommendationService;
