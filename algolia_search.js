const client = algoliasearch("APP_ID", "SEARCH_KEY");
const apis = client.initIndex("catalog-apis");

autocomplete(
  "#aa-search-input",
  {
    debug: true,
  },
  [
    {
      source: autocomplete.sources.hits(apis, { hitsPerPage: 100 }),
      displayKey: "name",
      templates: {
        suggestion({ _highlightResult }) {
          // console.log(_highlightResult);
          return (
            `<span>${_highlightResult.name.value}</span>` +
            `<span><img src='${_highlightResult.image.value.replace(
              /<[^>]*>?/gm,
              ""
            )}' style="width:32px;height:32px"></span>`
          );
        },
        empty: '<div class="aa-empty">No matching APIs found</div>',
      },
    },
  ]
).on("autocomplete:selected", function (event, suggestion, dataset) {
  location.href = suggestion.url;
});

const categoryName = $('.filter-category').attr('value');
const containerName= categoryName.split(' ').join('');
console.log(categoryName)

const search = instantsearch({
  indexName: 'catalog-apis',
  searchClient:client,
});

search.addWidgets([

  instantsearch.widgets.configure({
    filters:`category:"${categoryName}"`,
  }),

  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),

  instantsearch.widgets.hits({
    container: `#${containerName}`,
    templates: {
      item: `
      `
    }
  })

]);




search.start()

{
