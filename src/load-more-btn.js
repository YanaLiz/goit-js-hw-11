export default class LoadMoreBtn{
    constructor({ selector, hidden = false}) {
        this.refs = this.getRefs(selector);
        hidden && this.hide();
    }

getRefs(selector) {
    const refs = {}
    refs.button = document.querySelector(selector)
    refs.label = refs.button.querySelector('.spiner')
    return refs;
}
enable() {
    this.refs.button.disabled = false;
    // this.refs.label.textContent = 'Показати ще';
    // this.refs.spiner.classList.add('is-hidden');

}
disabled() {
    this.refs.button.disabled = true;
    // this.refs.label.textContent = 'Завантажуємо...';
    // this.refs.spiner.classList.remove('is-hidden');
}
    show() {
        this.refs.button.classList.remove('is-hidden');
}
    hide() {
        this.refs.button.classList.add('is.hidden');
}
};


