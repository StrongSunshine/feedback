$(function() {
    const scroll = $('.scroll')
    const scrollBox = $('.scrollbox')
    const text = $('.text')
    const textBox = $('.textbox')
    const userName = $('#name')
    const liuYan = $('#liuyan')
    const btn = $('.btn')
    const load = $('.load')
    const loadSpan = $('.loadbox').children()

    scroll.height(getheight())

    function getheight() {
        let height = parseInt(scrollBox.height() / (text.height() / textBox.height()))
        height = height <= 50 ? 50 : height
        height = height >= scrollBox.height() ? scrollBox.height() : height
        return height
    }

    userName.on('focus', function() {
        localStorage.getItem('feedbackUserName') && $(this).val(localStorage.getItem('feedbackUserName'))
    })

    userName.on('blur', function() {
        if ($(this).val().trim() !== '') {
            localStorage.setItem('feedbackUserName', $(this).val())
        }
    })

    btn.on('click', function() {
        clearInterval(this.timeid)
        if (userName.val().trim() == '' || liuYan.val().trim() == '') {
            $('#myModal').modal('show')
            return
        }
        load.css('display', 'block')
        for (var i = 0; i < loadSpan.length; i++) {
            $(loadSpan[i]).css('animation', 'dongqilai 2s ease-in-out var(--delay) infinite')
        }
        this.timeid = setTimeout(function() {
        	$.post("/upload", { userName: userName.val(), liuYan: liuYan.val()});
            let inner = '<p><span>' + userName.val() + '&nbsp:&nbsp</span><span>' + liuYan.val() + '</span></p>'
            $(inner).prependTo('.text')
            liuYan.val('')
            load.css('display', 'none')
            for (var i = 0; i < loadSpan.length; i++) {
                $(loadSpan[i]).css('animation', '')
            }
            scroll.height(getheight())
        }, 1500)
    })

    scroll.on('mousedown', function(evt) {
        evt = evt || window.event
        const y = parseInt(evt.clientY - scroll.offset().top)
        $(document).on('mousemove', function(evt) {
            let currentY = parseInt(event.clientY - y)
            let maxY = parseInt(scrollBox.offset().top + scrollBox.height() - scroll.height())
            let minY = parseInt(scrollBox.offset().top)
            $(window).on('mousemove', function() {
                let clearSlct = window.getSelection() ? function() {
                    window.getSelection().removeAllRanges();
                } : function() {
                    document.selection.empty();
                }
                clearSlct()
            })
            currentY = currentY <= minY ? minY : currentY
            currentY = currentY >= maxY ? maxY : currentY
            scroll.offset({ top: currentY })
            let textY = (currentY - scrollBox.offset().top) / (scrollBox.height() - scroll.height()) * (text.innerHeight() - textBox.height())
            text.css({ marginTop: -parseInt(textY) })
            console.log(textY)
        })
        $(document).on('mouseup', function() {
            $(document).off("mousemove")
            $(window).off('mousemove')
        })
    })
})