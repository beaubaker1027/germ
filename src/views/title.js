import links from "./components/word-links";
const Title = new Reef('#Header', {
  template: `
    <div class="l-fl-row l-fl-1 l-aln-c pad5">
      <h1 class="l-fl-1 l-low-op l-fw-n l-ft-xxl">Germ</h1>
      <button class="l-low-op l-ft-xs" data-import="true">▲</button>
      ${links}
    </div>
  `,
})

export default Title;