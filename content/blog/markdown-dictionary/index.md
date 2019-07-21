---
title: 마크다운(Markdown)문법 대-백과
date: '2018-10-31'
category: "Blog"
---
오늘은 사용할 때마다 가물가물한 마크다운 문법에 대해 정리를 해두려고한다.

---

### 제목 Headers
`#`와 숫자를 사용하여 제목을 작성할 수 있다.

| 마크다운 | 실행결과 |
| ---------- | :--------- |
| \# H1<br>\#\# H2<br>\#\#\# H3<br>\#\#\#\# H4<br>\#\#\#\#\# H5<br>\#\#\#\#\#\# H6         | <h1> H1<br><h2> H2<br><h3> H3<br><h4> H4<br><h5> H5<br><h6> H6        |

또는 `-`, `=`을 이용하여 H1, H2를 쓸 수 있다.

| 마크다운 | 실행결과 |
| ---------- | :--------- |
| h1<br>===<br><br>h2<br>--- | <h1> h1<br><h2> h2 |

---

### 인용 Blockquotes
`>`을 사용하여 인용 문구를 작성할 수 있다.

| 마크다운 | 실행결과 |
| ---------- | :--------- |
| > 인용문   | <blockquote> 인용문 </blockquote>     |
| >> 인용문안의 인용문    | <blockquote> 인용문 <blockquote> 인용문 </blockquote></blockquote>     |


### 코드 블럭 Code Blocks
<code>\`\`\`</code> 혹은 <code>\~\~\~</code> 코드 첫 줄과 마지막 줄에 Back quote ( \` ) 또는 물결( ~ ) 3개 삽입

| 마크다운 | 실행결과 |
| ---------- | :--------: |
| \`\`\`<br>이것은<br>코드 블럭<br>입니다<br>\`\`\`<br><br>\~\~\~<br> 이것은 <br>코드 블럭<br>입니다<br>\~\~\~ | <figure class="highlight bash"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br></pre></td><td class="code"><pre><span class="line">이것은</span><br><span class="line">코드 블럭</span><br><span class="line">입니다</span><br></pre></td></tr></table></figure><br><figure class="highlight bash"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br></pre></td><td class="code"><pre><span class="line">이것은</span><br><span class="line">코드 블럭</span><br><span class="line">입니다</span><br></pre></td></tr></table></figure>|
| \`\`\`c<br>void f()<br><pre>    printf(%s,“이것은 c 코드 입니다”);</pre>}<br>\`\`\` |<figure class="highlight c"><table><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br></pre></td><td class="code"><pre><span class="line"><span class="function"><span class="keyword">void</span> <span class="title">f</span><span class="params">()</span></span>&#123;</span><br><span class="line">	<span class="built_in">printf</span>(%s,<span class="string">"이것은 c 코드 입니다"</span>);</span><br><span class="line">&#125;</span><br></pre></td></tr></table></figure>|


### 인라인 코드 Inline Code Blocks
<code>\`(Back quote)</code>로 감싸진 텍스트

| 마크다운 | 실행결과 |
| ---------- | :--------- |
| \`인라인 코드 블럭\` | `인라인 코드 블럭`    |


### 강조 Emphasis
기울여 쓰기(italic) : `*` 또는 `_`로 감싼 텍스트
굴게쓰기(bold) : `**` 또는 `__`로 감싼 텍스트

| 마크다운 | 실행결과 |
| ---------- | :--------- |
| \*기울여쓰기(italic)\*<br>\_기울여쓰기(italic)\_<br><br>\*\*굵게쓰기(bold)\*\*<br>\_\_굵게쓰기(bold)\_\_ | *기울여쓰기(italic)*<br>_기울여쓰기(italic)_<br><br>**굵게쓰기(bold)**<br>__굵게쓰기(bold)__ |


### 수평선 Horizontal Rules
`-` 또는 `*` 또는 `_` 을 3개 이상 작성
(단, `-`을 사용할 경우 header로 인식할 수 있으니 이 전 라인은 비워두어야한다.)

| 마크다운 | 실행결과 |
| ---------- | :--------- |
| \-\-\- | <hr> |
| \*\*\* | <hr> |
| \_\_\_ | <hr> |


### 링크 Links
#### 외부 링크 External Links
`[링크](http://example.com "링크 제목")` 인라인 링크
`[링크1][1]` `[1]: http://example1.com/ "링크제목1"` 참조 링크
`<example.com/>` `<example@example.com>` url 링크

| 마크다운 | 실행결과 |
| ---------- | :--------- |
| **인라인 링크** <pre>\[Google\](http://www.google.co.kr "구글")</pre> | <br>[Google](http://www.google.co.kr "구글")|
| **참조 링크** <br>\[Google\]\[1\]<br>\[Naver\]\[2\]<br>\[1\]: http://google.com/ "구글"<br>\[2\]: http://naver.com/ "네이버" | <br>[Google][1]<br>[Naver][2]|
| **URl 링크**<br>&#60;http://google.com/<span>&#62;</span><br>&#60;example@gmail.com/&#62;| <br><http://google.com><br><example@gmail.com> |


[1]: http://google.com/ "구글"
[2]: http://naver.com/ "네이버"


#### 내부 링크 Internal (Anchored) Links
`[링크](#id)` 내부 링크

| 마크다운 | 실행결과 |
| ---------- | :--------- |
| \[목차\](#index) | [목차](#index) |
---
### 리스트 Lists
#### 순서 있는 리스트 Ordered Lists
`No. ` 숫자 다음 .을 찍는다. (적힌 숫자랑 상관없이 순서대로 번호가 매겨진다.)

| 마크다운 | 실행결과 |
| ---------- | :--------- |
| 1. list item 1<br>1. list item 2<br>2. list item 3<br>0. list item 4<br>3. list item 5 | <ol><li>list item 1</li><li>list item 2</li><li>list item 3</li><li>list item 4</li><li>list item 5</li></ol> |


#### 순서 없는 리스트 Unordered Lists
`*`, `+`, `-` 으로 시작

| 마크다운 | 실행결과 |
| ---------- | :--------- |
| \* list item 1<pre>	\* list item 1-1</pre><pre>	\* list item 1-2</pre> | <ul><li>list item 1</li><ul><li>list item 1-1</li><li>list item 1-2</li></ul></ul> |
| \+ list item 1<pre>	\+ list item 1-1</pre><pre>	\+ list item 1-2</pre> | <ul><li>list item 1</li><ul><li>list item 1-1</li><li>list item 1-2</li></ul></ul> |
| \- list item 1<pre>	\- list item 1-1</pre><pre>	\- list item 1-2</pre> | <ul><li>list item 1</li><ul><li>list item 1-1</li><li>list item 1-2</li></ul></ul> |


### 테이블 Tables
| 마크다운 | 실행결과 |
| ---------- | :--------- |
| **테이블 생성**<br>Header 1  &#124; Header 2<br>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &#124; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;<br>Content 1  &#124; Content 3<br>Content 2  &#124; Content 4 | <br><table><thead><tr><th>Header 1</th><th>Header 2</th></tr></thead><tbody><tr><td>Content 1</td><td>Content 3</td></tr><tr><td>Content 2</td><td>Content 4</td></tr></tbody></table> |
| **테이블 정렬**<br>&#124; Header 1  &#124; Header 2  &#124; Header 3  &#124;<br>&#124; :&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &#124; :&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;: &#124; &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;: &#124;<br>&#124; Left       &#124; Center       &#124; Right       &#124; | <br><table><thead><tr><th style="text-align:left">Header 1</th><th style="text-align:center">Header 2</th><th style="text-align:right">Header 3</th></tr></thead><tbody><tr><td style="text-align:left">Left</td><td style="text-align:center">Center</td><td style="text-align:right">Right</td></tr></tbody></table>|


### <div id="images">이미지 Adding Images
| 마크다운 | 실행결과 |
| ---------- | :--------- |
| **인라인 이미지**<pre>!&#91;alt text&#93;&#40;/test.png &#41;</pre>| ![alt text](B9653641350_l.jpg) |
| **링크 이미지**<pre>!&#91;alt text&#93;&#40;image_URL&#41;| ![alt text](https://suitee.me/images/20181030/B9653641350_l.jpg) |

