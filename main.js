// 좌측 프로필 이미지 등장 애니메이션
window.addEventListener('DOMContentLoaded', function () {
  const profileImg = document.getElementById('profile-img')
  setTimeout(() => {
    profileImg.classList.add('visible')
  }, 300)

  // 타이핑 효과 텍스트
  typeWriter('typing-h1', '김서진의 포트폴리오 \n 사이트 입니다.', 60, () => {
    setTimeout(() => {
      typeWriter(
        'typing-h5',
        '밑에는 저의 깃허브, 인스타그램, 블로그가 있습니다.\n 버튼을 눌러 이동 할 수 있어요! \n 위에는 네비게이션바 입니다. \n글씨를 클릭하여 페이지를 이동 하실 수 있어요!',
        40
      )
    }, 600)
  })
})

// 타이핑 효과 함수
function typeWriter(elementId, text, speed, callback) {
  const el = document.getElementById(elementId)
  el.innerHTML = ''
  let i = 0
  function typing() {
    if (i < text.length) {
      if (text.charAt(i) === '\n') {
        el.innerHTML += '<br>'
      } else {
        el.innerHTML += text.charAt(i)
      }
      i++
      setTimeout(typing, speed)
    } else if (callback) {
      callback()
    }
  }
  typing()
}

// 방명록 기능
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('guestbook-btn')
  const list = document.getElementById('guestbook-list')
  if (btn && list) {
    renderGuestbook()

    btn.addEventListener('click', function () {
      if (confirm('글을 남기시겠습니까?')) {
        const name = prompt('이름을 입력하세요')
        if (!name) return
        const content = prompt('내용을 입력하세요')
        if (!content) return
        const entry = { name, content, date: new Date().toLocaleString() }
        const guestbook = JSON.parse(localStorage.getItem('guestbook') || '[]')
        guestbook.push(entry)
        localStorage.setItem('guestbook', JSON.stringify(guestbook))
        renderGuestbook()
      }
    })

    function renderGuestbook() {
      const guestbook = JSON.parse(localStorage.getItem('guestbook') || '[]')
      list.innerHTML = guestbook
        .map(
          (e) =>
            `<div class="guestbook-list-entry">
              <span class="guestbook-meta"><b>${e.name}</b> · ${e.date}</span>
              ${e.content}
            </div>`
        )
        .join('')
    }
  }
})

// 프로젝트 모달(팝업) 기능
function setupProjectModal() {
  // 여러 프로젝트 카드/모달 지원
  document.querySelectorAll('.project-detail-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation()
      const modalId = btn.getAttribute('data-modal')
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.add('active')
        document.body.style.overflow = 'hidden'
      }
    })
  })
  document.querySelectorAll('.project-modal').forEach(function (modal) {
    // X 버튼
    modal.querySelector('.modal-close').addEventListener('click', function () {
      modal.classList.remove('active')
      document.body.style.overflow = ''
    })
    // 모달 바깥 클릭 시 닫기
    modal.addEventListener('mousedown', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active')
        document.body.style.overflow = ''
      }
    })
  })
}
// 프로젝트 페이지에서만 실행
if (document.querySelector('.project-list')) {
  setupProjectModal()
}
