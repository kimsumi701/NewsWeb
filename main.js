let articles = [];

const getLatestNews = async () => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=2`);
    let header = new Headers({ 'x-api-key': 'LAR13o0Awny6Ob1E5M8Cgfz2pBuJVnQJLUvEvDyQ7LM' });
    let response = await fetch(url, { headers: header });
    let data = response.json();
    news = data.articles;
    console.log(news);
    // pending : 데이터가 아직 도착하지 않은 상태
    // async - await 세트로 써야함
};
getLatestNews();