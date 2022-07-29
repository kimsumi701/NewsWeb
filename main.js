let articles = [];
let topic = 'Sport';

// 숙제 : 메뉴에서 토픽이 바뀔때 뉴스 내용이 바뀌는 것 구현하기
const getLatestNews = async () => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    let header = new Headers({ 'x-api-key': 'LAR13o0Awny6Ob1E5M8Cgfz2pBuJVnQJLUvEvDyQ7LM' });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    console.log(news);
    render()
    // pending : 데이터가 아직 도착하지 않은 상태
    // async - await 세트로 써야함
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
            <p>${
            news.summary == null || news.summary == '' ? '내용 없음' : news.summary.length > 200 ?
            news.summary.substring(0, 200) + "..." : news.summary
            }</p>
            <div>${news.rights || 'No source'} * ${moment(news.published_date).fromNow()}</div>
        </div>
    </div>`
    }).join('');
    document.getElementById('news-board').innerHTML = newsHTML;
}
getLatestNews();