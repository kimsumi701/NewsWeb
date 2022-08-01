let articles = [];
let topic = 'sport';
let menus = document.querySelectorAll('#menu-list button');
menus.forEach((menu) => menu.addEventListener('click', (event) => getNewsByTopic(event)));
let searchBtn = document.getElementById('search-button');
let url;

const getNews =  async () => {
    let header = new Headers({ 'x-api-key': 'LAR13o0Awny6Ob1E5M8Cgfz2pBuJVnQJLUvEvDyQ7LM' });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;    
    render();
}
const getLatestNews = async () => {
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=10`);       
    getNews();
};
const getNewsByTopic = (event) => {
    topic = event.target.textContent.toLowerCase();
    getLatestNews();
};
const getNewsByKeyword = async () => {
    // 검색 키워드 읽어오기 -> url에 검색 키워드 붙이기 -> 헤더 준비
    // -> url 부르기 -> 데이터 가져오기 -> 데이터 보여주기 ..
    let keyword = document.getElementById('search-input').value;
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=KR&page_size=10`);
    getNews();
};
const render = () => {
    let newsHTML = '';
    newsHTML = news.map((news) => {
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${news.media ||
            'https://www.youtube.com/redirect?event=live_chat&redir_token=QUFFLUhqblVPbGdQM1VVOFB1YWJzSVM5UW1URG9VYk1mQXxBQ3Jtc0trOUhfU1E0TEpRMEVST2RBNktkX0RnQlJNamlhYktNZVBMSk5kNEpMbWRSWmtpbU9pNWwtTUh1SkNpVkwwYjZjczJxOWRWR0ZVZS1JYU50SFVENldQc1Uwa3pkaVpyUEc3ZktlWnh6cS03Z182RnQ2SQ&q=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw%26usqp%3DCAU'}"
            alt="뉴스 이미지">
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.summary == null || news.summary == '' ? '내용 없음' : news.summary.length > 200 ?
                news.summary.substring(0, 200) + "..." : news.summary
            }</p>
            <div>${news.rights || 'No source'} * ${moment(news.published_date).fromNow()}</div>
        </div>
    </div>`
    }).join('');
    document.getElementById('news-board').innerHTML = newsHTML;
    document.getElementById('search-input').value = '';
};

searchBtn.addEventListener('click', getNewsByKeyword);
getLatestNews();