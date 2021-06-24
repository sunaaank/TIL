const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

// Fix: window가 모두 load 되면(image가 모두 로드된 이후) target을 등록 
addEventListener('load', () => {
  const targetRect = target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Fix: top, left는 layout, paint가 다시 일어나기 때문에 composite만 발생하는 transform으로 변경
    vertical.style.transform = `translateX(${x}px)`;
    horizontal.style.transform = `translateY(${y}px)`;
    target.style.transform = `translate(${x-targetHalfWidth}px, ${y-targetHalfHeight}px)`;
    tag.style.transform = `translate(${x+40}px, ${y-40}px)`;
    tag.innerHTML = `Shoot ! ${x}px, ${y}px`
  })
})