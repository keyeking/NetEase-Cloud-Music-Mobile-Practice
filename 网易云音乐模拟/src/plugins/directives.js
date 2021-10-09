export default function(Vue) {
    Vue.directive('height', {
        // height自定义指令的作用就是用来返回当前可使用的屏幕高度
        inserted(el, binding) {
            // 如果有值此时我们返回屏幕高度减去当前传入的值
            if (typeof binding.value == 'number') {
                return el.style.height = (window.innerHeight - binding.value) + 'px'
            } else {
                return el.style.height = (window.innerHeight) + 'px'
            }
        }
    })
}