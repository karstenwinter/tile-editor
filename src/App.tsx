import React, {Component} from 'react';
import './App.css';
import {MyDropzone} from "./MyDropzone";
import {DroppableImage, pngPrefix} from "./DroppableImage";

interface AppProps {
}

interface SpriteItem {
  user: string,
  name: string,
  date: string,
  num: string,
  x: string,
  y: string,
  w: string,
  h: string,
  img: string
}

interface AppState {
  currentImage?: string

  tickMod: number
  len: number,

  result?: string,
  user: string,
  name: string,
  state: string,

  items: SpriteItem[],

  w: number
  h: number
  x: number
  y: number

  i1?: string
  i2?: string
  i3?: string
  i4?: string
}

class App extends Component<AppProps, AppState> {
  i: number;
  timer: number;

  constructor(props: AppProps) {
    super(props);
    this.i = 0;
    this.timer = 0;
    this.state = {
      items: [],
      user: "anon" + new Date().getTime(),
      state: "idle",
      name: "unnamed",
      tickMod: 30,
      len: 4,
      x: 0,
      y: 255,
      w: 32,
      h: 255 - 32,
      // gino from szadiart.itch.io
      i1: "data:image/png;base64,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cAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmJjZDZlMzc1LTQ3MDctNjk0Yy1iZWExLWQ1N2Q1YzMwMzhjNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBRUQ1OTk1QTg0N0YxMUU5OUNDNkJGRDMyODgzMDU2QyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRUQ1OTk1OTg0N0YxMUU5OUNDNkJGRDMyODgzMDU2QyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozOGM2NjFmMS04MzMzLTM1NDMtYjUwYi0wYzE5YWI1ZDk5NjAiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NzhjYmExOS0yYWZjLTExNDItYWJmNS02ODVlM2IzOGExNzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6igOH8AAADUElEQVR42uyaS2gTQRjHvzERil69SBAqqQkStC0VxIP4OKitglo85KBFrDaCl56UiqGUSIs3raeWVnyBESQK0goloj2JiPgoogYXCx6KxZNQaWjCuLObncxmd9t0E+js7HywZGd2Z9P/b/7fPLJFGGPwc6wDn4cEIAFIABKABCABSAASgAQgAUgAEoAEIAFIABKABCABSAASgAQgAfgogm4aIYTo+VwkYncLeduClnvG5lyufPMavpxBbr78adCZ255wWHvgG0VBbJ1aBicoJwsFMVKAEW+4gNb5agxQRbOpYIHEE5RgHZ+FHSCwZUt6iOKAqnuUTQ8RHICrFLxSW+Q5B4RT3Zi1eqXliXBW/KQ620xaZxy0luJrcQAuQQC4+3rZHp8+fkQ/efbCTry3x4D0qx8wf3Y/7X1WPBFuiD+3KwQbT7RTJ3h+JbhSEOFENBukfAfaYaHsBMyDC+oKoLNY1E8yE3ArA/BpsIdea746ql8KBBBPs0DN06CRBiRYwWxs7dxthSTCGBA/0GSpWywsQmgiZCue1MfGYtyIrwmAkhx3hKAcVuDvt3GTeFIm9byF292g3RqfpgLb8z8zbyudgLKxHiF2g442ZnteyB9EbEDo+/2koi+OnGEgTwPIF/OOS+JTT/TyjdLYwApXLY94dUDNe4HKGIinaO7vTf3WjncH92GRAOCO/MKqGxEI5Cg8fqQdXgVA//Do5WFaadifja4vjZa61sRFes4LBFeDYEOwgZ5vcyGeh+nPNQAi/t7RJTizaYmO7K2Fm7Q3t8QPwa/0FLBlGM5ytf6vyzT44M967VMFgT8EeyE606uVv/ePQnSgvNAhMHYw0yVvU+KqV4LkpYjhABUCbWw4goDYsN2cAqoL0PNjbWJNgyXR6PrcJZMj7IJNCSH2AkZE2hK2jSsdQOLjwz4knAPshJL493XWH3uB+7FZ6IJGi2gCRhv9/bAZIhC0uR/KbuiYz5Kpz3Tf55km2Nk3IlYKVIJQhaNSriOvpEA9X46ian8v8Pws0HJ6SPvsTydNCxt1swODUy91yw8l4Pa1MdP16ZbzkHs/IgwA2lAFofX2leZuk8ALgQCook0QeAPgNgVsqVUhDguRAiKF/Dc5vwP4L8AARPc9aBv69UgAAAAASUVORK5CYII=",
      i2: "data:image/png;base64,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cAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmJjZDZlMzc1LTQ3MDctNjk0Yy1iZWExLWQ1N2Q1YzMwMzhjNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBREM1MEQ2RTg0N0YxMUU5ODRBOUEzQTk0QThENDEzMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBREM1MEQ2RDg0N0YxMUU5ODRBOUEzQTk0QThENDEzMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozOGM2NjFmMS04MzMzLTM1NDMtYjUwYi0wYzE5YWI1ZDk5NjAiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NzhjYmExOS0yYWZjLTExNDItYWJmNS02ODVlM2IzOGExNzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ScX5rAAADZElEQVR42uyaTWgTQRTH3zQRi716kSBEUhOkaFsriAfx46C2CmoRrKBFrCaCl56UiqVIpcWb1lOLEfwAI5QoSCOUiPQkRURrETUYLHgoLZ6ESkMT1p1JZjL7labZQHcn8yDszmx2w/83782btxOkKArUstVBjZsEIAFIABKABCABSAASgAQgAUgAEoAEIAFIABKABCABSAASgAQgAdSQeSu5CSHEzueDQbOv4N0WVOoZW1Kp4pfXcXMGVfLjL73W3PYFAuSB79NpxPepbbCCcjqbFSMEOPHUC1hfTc0Bqmg+FAyQnATFW8VnKRYQ+LYhPETxgLJHlA8PETxAKVPwavci13lAYLCnpMtj4bz4hJptEsaMg9ZTvB0ASgGC6YjzwqdOHiMfsxTs+jkg9u4ngUBH30r4pT0+aDjVzjzB9SvB1QwLx6J5w+1H0A5Lr96wxU+pBZUrAXTmcvmT+ATcjwPMDIXZteabY/lLHg9yUhawnQZxGCxePEjOecG8bevca4QkAoCuQ42GvuXsMvgmfKbicX/hmvsXQun+qCWE9NE0/P0e1YjHbdxfTkHlhmpQsVgbGEb+V3xa7wko2RQWohq0dGN+5J1udRWOPpnJ1ZHTrORoWOhh8KPv6jdCmVxG0/4yHFGo258ZB7g7EyXHcZjWeIHq8kgYDzCrA6jdaO6BTTv8LPb3Dy6Qz4fDBxz7UmTNU3FHZgkSGxtM64BSRiG0Rq7mf/jsOVfWAmwkQ9dHWCd2e711f/Ub+qh4bNkXzxVXegBbzXnryfn23eE1i3dC+qsYQL0q/PHxFbiweYXN7K3Ze2w0t3Ydgd+xSeDbMJJ01Pq/KsXQ0z8byFEFoXzy9kJotpe0fwyMQeh20SswjJ3FFOiIt0C2VoJ4U4R6gAqB3Uw9AoOgmYDzAvT6RJs4aZATje7MX9N4hJnxIeE0Q3a2pYJtEdOb9R6A7fOzPiScB5gJxfbv25xragFbNemTpjnoBr9BNAZDZn/RAVAIJPdD0Rs6FpM49WnrhtlG2NU3KlYI6EGowlEh1pFbQqCam6Oo3PcFrs8CLeeHyXEg1q9Z2KgFDwxNvqWlMjy49VBzfarlMqQ+jgoDgN2ogkC0HOYFXvF4QBWtgeA0ALa2xvRWhjhFiBAQyeTf5GodwH8BBgCs70FEjWvq+QAAAABJRU5ErkJggg==",
      i3: "data:image/png;base64,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cAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmJjZDZlMzc1LTQ3MDctNjk0Yy1iZWExLWQ1N2Q1YzMwMzhjNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBQ0IzQkI3Mjg0N0YxMUU5OEMxNEU4MEI1RDU3Q0VCRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBQ0IzQkI3MTg0N0YxMUU5OEMxNEU4MEI1RDU3Q0VCRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozOGM2NjFmMS04MzMzLTM1NDMtYjUwYi0wYzE5YWI1ZDk5NjAiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NzhjYmExOS0yYWZjLTExNDItYWJmNS02ODVlM2IzOGExNzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4OH0+bAAADaUlEQVR42uyaTWgTQRTH35gIRa9eJAiR1AQp2tYq4skP8KNVUEsPPWgRPxqhl56UiqWI0ly1nlqs4AcYoURBWqFEJScREbWhqMFgwUOh9CRUKk1Z981mN7Ob3XzsBrI7mQfLzuxX+P/eezNvdkMkSYJGtg3Q4CYACAACgAAgAAgAAoAAIAAIAAKAACAACAACgAAgAAgAAoAAIAAIAA1kfjs3EUK09mI4bHUZfnEhpZ6zNZNRLqzjxxli58df+EtzOxAK0Ye+z2YJe0zugxmUs7kcPynAiFejQDvG/RhgJtQAhGDfTUD8NXyWZBAOJv2i1OAlAir2KJsaPESAVKHgcvcSz0VA6PalkiGPwlnxM/JsM1M845B6incCQMpDMPU4Kzx1+gTdzKZgz48B8Xc/KQTV+1bCL+4NwOYznVokeL4SLGcoHEWzhv2H0AkrL19rxU+5gspzALrX15VGYhruJQC+jvZr51pvTCinfD7iplnA8TSIabB04RBts4JZ2969v/CD82l+KsHew81Fx1ZzqxCYDpiKx+MD2aOuGQAdAcgOT1pCyB7Pwp/vkzrx2MfjbjO7q0HJojYo8vyvxAdjJJBkS793V4NW4q1y3u1mNwVI3nO6Sk5NCyMM1vueToG89+k0huLnYlGJFX+9VUmBqR59FMghX1J4PVOgWgC0DDYrgXumlP2mnUF43LJA233zQbrvWkrCvrcp4kYAtlIgcm2s6ns+Hjko4ZZ7/oxunhwDuv6tSPJWBEH1Pmuq91lrj17V2ggBPV9P79suhZv8TVp7x57+qsV7ejGE4h+dXIPzW9a0caQ9d1cL6W29x+B3fBbYPowlXVX/12Qx9GR5I93LIKTP/kGIpAdp/8fIBERuFaICYewqTIGueAvkqBLEjyJqBMgQtJvViEAQOBOwJkcBeXWqg6tCSBVN7iwO6CLCzNiU4GItoFq4I2p6szEC0L48HSLcRYCZULS/3xY8sxZw9EYIK74+CBaJRjB09OcdgAqBzv1QiAYsfeWpT3fdXLoZdg+N85UCRhCycJLPdeKVFKjlx1FSps/PLNB2Lkb3I/FhXWEjL3ZgdPaNEvKxKNy/+UB3PtV2GTKfxrkBoN0og6DexvcBrMArPh/IonUQ3AbA0acxo1UgTuIiBXgy8Te5RgfwX4ABAHvnVdac1gH5AAAAAElFTkSuQmCC",
      i4: "data:image/png;base64,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cAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmJjZDZlMzc1LTQ3MDctNjk0Yy1iZWExLWQ1N2Q1YzMwMzhjNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBQkEyMjkzRTg0N0YxMUU5QTY3MDg5MTc3RDAyRjFEQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBQkEyMjkzRDg0N0YxMUU5QTY3MDg5MTc3RDAyRjFEQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozOGM2NjFmMS04MzMzLTM1NDMtYjUwYi0wYzE5YWI1ZDk5NjAiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NzhjYmExOS0yYWZjLTExNDItYWJmNS02ODVlM2IzOGExNzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6m1V0FAAADaklEQVR42uybT0hUQRzHf6MbiF27xBJsrO0SYmoW0al/ZLkFlXjwUBL92Q28eDKURKLQa20nJYMsaAOxIDSQrdhTSETlItXSI6GDIJ4Cw3Blmhl7s/PevrfuP/C92fnB483Mvrf6/fx+M/ObGUUYY6hkq4IKNwVAAVAAFAAFQAFQABQABUABUAAUAAVAAVAAFAAFQAFQABQABUABUAAqxzzFvIQQ4uXFQMDqEXrchHJ9x85UKvPwFp5OoWJ++AuPPbfDfj/7wveahsQ2Ugc7KBfSaTm6gCBejwLeVgljABZAZLWJkJwExVNu8RYQxHpW95AhAgryptg9ZIgAnKfgzd5FrosA/52rOFfIU+Gi+Gky20xnzzhoK8WXAgD/h2DpcVF44txpdllNwa4fA2LvfjAIuvfthF854IXt59t4JLg+E9zMqHAqWjRafwRtsPLyNU9+ciVUrkyE2tfX2XV/csryc9oeEvNoGaZB2g2WLh9l5S9DYd7e2D/Ky7vbD/F61XxSnkyw81hdVttqehW8U16DeN1oe7d20jEDYEkAtIExWwjaKQ1+fxsziKd12u40K3Y1aJn66l1B9PzPyVlzJKB4fViK1SCyy/hEzzvdqor0PhWPiecMmZzeLUSjMETvu3pHyCx+bjjCu8LNxo2ssHbeB+Mwa4gCEvLIqRFQ0BggAjCnwR0TmfJEx8a9i8CgFlqKw8G3CVsIbhoDmPjQ3xXbB2r3+izbPxw/gumVfv6MXa4cA4hw/osHe6OW3tdN975ozZEbvOwUCAUn49T7NZ4aXt+zP1yweCeEftEAqPjHZ9bg0o413i2a0/e4N3d1tsKv2AyIdYjGkZN2gcqyGnyyvI3dCQj8ydMDwWQPq38fHIXg7UxUUBgNwvjhtP2AgjNBupjTI4BA4C/rEUFBmAdCEgXo1dkWORIh0YhodHex2xARVkaiwLFnA6iUY6lASwTnOx1+ftqHpIsAuznfbGwgdKiVtCc1Xr8AXeCDP18XssCIohuivTCXrIN9fSNyARAhmLsWEe2Kf0gsy64khUBF0+2xoZk30N96wmrak2cQbLo4zO6DsQHDvE5yfQaAGlkpwoNbDw2fJ5quQerjiDQA+IsEBNKXxKLA69XVQEQbIDgNQEknQ2bLQxyWogvIZOqvxCodwD8BBgD4FFTl91ylnQAAAABJRU5ErkJggg=="
    };
  }

  componentDidMount(): void {

    setInterval(() => {
      this.tick();
    }, 1);
  }

  render() {

    return (<div>

      <h1>Tile/Sprite/Animation Editor</h1>

      {/*<div style={{
        display: "flex",
        justifyContent: "space-around"
      }}>
        <DroppableImage/>
        <DroppableImage/>
        <DroppableImage/>
      </div>*/}

      <table>
        <tr>
          <td>Delay</td>
          <td>{this.state.tickMod}</td>
          <td>
            <button onClick={() => this.setState({tickMod: this.state.tickMod - 10})}>
              -10
            </button>
          </td>
          <td>
            <button onClick={() => this.setState({tickMod: this.state.tickMod + 10})}>
              +10
            </button>
          </td>
        </tr>


        <tr>
          <td>Frames</td>
          <td>{this.state.len}</td>
          <td>
            <button onClick={() => this.setState({len: this.state.len - 1, result: undefined})}>
              -1
            </button>
          </td>
          <td>
            <button onClick={() => this.setState({len: this.state.len + 1, result: undefined})}>
              +1
            </button>
          </td>
        </tr>
        <tr>
          <td>User</td>
          <td><input type="text" value={this.state.user} onChange={(ev) => {
            let user = ev.target.value;
            this.setState({user, result: undefined})
          }}/></td>
        </tr>
        <tr>
          <td>Sprite name</td>
          <td><input type="text" value={this.state.name} onChange={(ev) => {
            let name = ev.target.value;
            this.setState({name, result: undefined})
          }}/></td>
        </tr>
        <tr>
          <td>Sprite state</td>
          <td><input type="text" value={this.state.state} onChange={(ev) => {
            let state = ev.target.value;
            this.setState({state, result: undefined})
          }}/></td>
        </tr>
      </table>

      <h1>Frame images</h1>

      <div style={{
        display: "flex",
        justifyContent: "space-around"
      }}>
        {Array.from({length: this.state.len}).map((x, i) => {
          let st: any = this.state;
          let stateElement = st["i" + (i + 1)];
          return <DroppableImage value={stateElement} withImageDo={(img: string) => {
            let obj: any = {result: undefined};
            let key = "i" + (i + 1);
            obj[key] = img;
            console.log(key + ": \"" + img + "\",")
            this.setState(obj);
          }}/>
        })}
      </div>
      <h1>Bounding Box</h1>


      <h1>Preview (Box rect (x,y,w,h): ({this.state.x},{this.getY()},{this.state.w},{this.getH()}))</h1>
      <table>
        <tr>
          <td>
          </td>
          <td>
            <input type="range" min="0" max="255" value={this.state.x} onChange={(ev) => {
              let x = parseInt(ev.target.value);
              //console.log("range w", w);
              this.setState({x, result: undefined})
            }}/>
          </td>
          <td>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <input type="range" min="0" max="255" value={this.state.y} style={{
              marginTop: 50,
              transform: "rotate(270deg)",
              float: "right"
            }} onChange={(ev) => {
              let y = parseInt(ev.target.value);
              //console.log("range h", h);
              this.setState({y, result: undefined})
            }}/>
          </td>
          <td>
            <div style={{

              float: "left",
              position: "absolute",
              zIndex: 12,

              border: "1px solid red",
              width: this.state.w,
              height: this.getH(),
              marginLeft: this.state.x,
              marginTop: this.getY()
            }}/>
            <img src={this.state.currentImage} alt=""/>
          </td>
          <td>
            <input type="range" min="0" max="255" value={this.state.h} style={{
              marginTop: 50,
              transform: "rotate(270deg)",
              zIndex: 122
            }} onChange={(ev) => {
              let h = parseInt(ev.target.value);
              //console.log("range h", h);
              this.setState({h, result: undefined})
            }}/>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="range" min="0" max="255" value={this.state.w} onChange={(ev) => {
              let w = parseInt(ev.target.value);
              //console.log("range w", w);
              this.setState({w, result: undefined})
            }}/>
          </td>
          <td></td>
        </tr>
      </table>
      <br/>
      <button onClick={() => {
        let i1 = this.state.i1 || (pngPrefix + "");
        let params = "w=" + this.state.w
        + "&h=" + this.getH()
        + "&x=" + this.state.x
        + "&y=" + this.getY()
        + "&date=" + new Date().toISOString().substring(0, 10)
        + "&user=" + encodeURIComponent(this.state.user)
        + "&state=" + encodeURIComponent(this.state.state)
        + "&name=" + encodeURIComponent(this.state.name)
        + "&image=" + encodeURIComponent(i1.substring(pngPrefix.length))
        + "&num=" + 1;

        /*var formData = new FormData();
        formData.append('x', "" + this.state.x);
        formData.append('y', "" + this.state.y);
        formData.append('user', this.state.user);
        formData.append('w', "" + this.state.w);
        formData.append('h', "" + this.state.h);
        formData.append('state', this.state.state);
        formData.append('name', this.state.name);
        formData.append('num', "" + 1);
        formData.append('image', i1.substring(pngPrefix.length, 200));
        formData.append('date', new Date().toISOString().substring(0, 10));*/

        let url = "https://broxp.lima-city.de/tile-editor/put.php";
        //let body = formData;
        fetch(url, {
          method: "POST",
          //body: formData
          body: params,
          headers: {"Content-Type": "application/x-www-form-urlencoded"}
        });
        //.then(r => {
        //this.setState({result: "Result: " + r.status})
        //}).catch(r => {
        //this.setState({result: "Result: " + r.status})
        //});
        this.setState({result: "Saved"})
      }}>
        Save
      </button>
      <br/>
      {this.state.result}

      <br/>
      <h1>
        Browse creations
      </h1>
      <button onClick={() => {
        let url = "https://broxp.lima-city.de/tile-editor/logs.txt";
        //let body = formData;
        fetch(url)
        .then(r => r.text())
        .then(text => {
          let items: SpriteItem[] = [];
          this.setState({items});
        });
      }}>
        Load
      </button>
      <table>
        <tr>
          <th>User</th>
          <th>Date</th>
          <th>Sprite Name</th>
          <th>Sprite Number</th>
          <th>Preview</th>
        </tr>
        {this.state.items.map((row, i) =>
        <tr key={i}>
          <tr>User</tr>
          <tr>Date</tr>
          <tr>Sprite Name</tr>
          <tr>Sprite Number</tr>
          <tr>Preview</tr>
        </tr>)}
      </table>
    </div>
    );
  }

  tick() {
    this.timer = this.timer + 1;
    //console.log(this.timer + "/" + this.state.tickMod + "/" + this.i + ":" + this.state.currentImage);
    if (this.timer % this.state.tickMod === 0) {

      let len = this.state.len;
      let i = this.i || 0;
      let state: any = this.state;
      this.setState({
        currentImage: state["i" + (i + 1)]
      });
      this.i = (i + 1) % len;
      this.timer = 0;
    }
  }

  getH() {
    return 255 - this.state.h;
  }

  getY() {
    return 255 - this.state.y;
  }
}

export default App;
