__* Need to set CSS and HTML attribute__
__* jQuery baesd__

scroll-animaiton attribute : ['vertical','horizontal']
animation-direction attribute : ['BTT', 'TTB', 'RTL', 'LTR']

---
example)

```html
    <style>
      [opacity-init=visible] {
        opacity: 1;
      }
      [opacity-init=hidden] {
        opacity: 0;
      }
    </style>
    
    <div class="animatingTagClassNamme" scroll-animation="vertical" animation-direction="BTT" opacity-init="hidden">
    </div>
    
    <script type="text/javascript">
      var scroller = new scrollAnimation('[scroll-animation]');
      scroller.init('0.5s', 'ease-in-out', '0.1s', 50);
    </script>
```
    
