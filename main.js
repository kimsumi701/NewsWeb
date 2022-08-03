let articles = [];
let topic = 'sport';
let menus = document.querySelectorAll('#menu-list button');
menus.forEach((menu) => menu.addEventListener('click', (event) => getNewsByTopic(event)));
let searchBtn = document.getElementById('search-button');
let url;
let page = 1;
let totalPage = 1;

// api 호출
const getNews = async () => {
    try {
        let header = new Headers({ 'x-api-key': 'LAR13o0Awny6Ob1E5M8Cgfz2pBuJVnQJLUvEvDyQ7LM' });    
        url.searchParams.set('page', page);
        let response = await fetch(url, { headers: header });        
        let data = await response.json();
        if (response.status == 200) {
            news = data.articles;                 
            if (data.total_hits == 0) {
                throw new Error('검색된 결과가 없습니다.');
            };
            totalPage = data.totalPage;
            page = data.page;
            render();    
            pagenation();
        } else {
            throw new Error(data.message);
        };   
    } catch (error) {
        errorRender(error.message);
    };
    
}
// 최신 뉴스 api url
const getLatestNews = async () => {
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=10`);       
    getNews();
};
// 최신 뉴스 메뉴(토픽)별 호출
const getNewsByTopic = (event) => {
    topic = event.target.textContent.toLowerCase();
    getLatestNews();
};
// 키워드 검색 api url
const getNewsByKeyword = async () => {
    // 검색 키워드 읽어오기 -> url에 검색 키워드 붙이기 -> 헤더 준비
    // -> url 부르기 -> 데이터 가져오기 -> 데이터 보여주기 ..
    let keyword = document.getElementById('search-input').value;
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=KR&page_size=10`);
    getNews();
};
// news board
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
// 에러 메세지 발생시
const errorRender = (message) => {
    // 부트스트랩 컴포넌트
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">${message}</div>`;
    document.getElementById('news-board').innerHTML = errorHTML;
}
// 페이지 함수
const pagenation = () => {
    // 1. 토탈페이지 수를 알아야 한다.
    // 2. 내가 현재 어떤 페이지를 보고 있는지를 알아야 한다. 
    // 3. 페이지 그룹을 찾아야 한다. 
    let pageGroup = Math.ceil(page / 5);
    // 4. 이 그룹을 베이스로 마지막 페이지가 뭔지 찾고,
    let lastPage = pageGroup * 5;
    // 5. 첫번쨰 페이지가 뭔지를 찾고, 
    let firstPage = lastPage - 4;
    // 6. 첫페이지부터 마지막까지 프린트, 출력해주기
    let pagenationHTML = ` <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page - 1})">
                            <span aria-hidden="true">&lt;</span>
                            </a>
                        </li>`;
    for (let i = firstPage; i <= lastPage; i++) {
        pagenationHTML += `<li class="page-item ${page == i ? 'active' : ''}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
    };
    pagenationHTML += ` <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page + 1})">
                            <span aria-hidden="true">&gt;</span>
                            </a>
                        </li>`;
    document.querySelector('.pagination').innerHTML = pagenationHTML;
};
// 페이지 이동
const moveToPage = (pageNumber) => {
    // 1. 이동하고 싶은 페이지를 알아야한다.
    // 2. 이 페이지를 가지고, API를 호줄해준다.
    console.log(pageNumber);
    page = pageNumber;
    getNews();
}
searchBtn.addEventListener('click', getNewsByKeyword);
getLatestNews();