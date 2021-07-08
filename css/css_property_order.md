
# CSS 프로퍼티 선언 순서
- 보편적으로는 타입에 대한 분류 방법이 선호된다.


## Ordering rules
1. Position
2. Layout
3. Display
4. Visibility
5. Box model
6. Color
7. Text
8. Animation
9. Others
10. Pseudo elements

### Positioning
1. position
2. z-index
3. top
4. bottom
5. left
6. right
7. trasnform

### Layout
1. float
2. clear

### Display
1. display
2. flex-direction
3. flex-wrap
4. justify-content
5. align-content
6. align-items
7. order
8. flex-grow
9. flex-shrink
10. flex-basis
11. align-self

### Visibility
1. visibility
2. overflow
3. clip

### Box model
밖에서 안으로 향하는 순서(From outside in)로 나열한다. 

1. box-sizing
2. width
3. min-width
4. max-width
5. height
6. min-height
7. max-height
8. margin
9. padding

### Color
1. color
2. border
3. border-radius
4. background
5. box-shadow
6. opacity

### Text
1. font
2. font-family
3. font-size
4. font-weight
5. font-style
6. font-variant
7. font-size-adjust
8. font-stretch
9. font-effect
10. font-emphasize
11. font-emphasize-position
12. font-emphasize-style
13. font-smooth
14. line-height
15. letter-spacing
16. white-space
17. word-break
18. text-overflow

### Animation
1. transition
2. animation

### Others
1. cursor
2. outline
3. outline-width
4. outline-style
5. outline-color
6. outline-offset

### Pseudo elements
1. :hover
2. :focus
3. :active
4. :first-child
5. :last-child
6. ::before
7. ::after

## 샘플코드
```css
.selector {
  /* Positioning */
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  transform: translate(-50%);

  /* Display & Box Model */
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;
  border: 10px solid #333;

  /* Color */
  background: #000;
  color: #fff
  
  /* Text */
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.4;
  text-align: right;

  /* Other */
  cursor: pointer;
}
```
