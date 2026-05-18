<html>
<head>
    <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
    />
    <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossorigin="anonymous"
    />
</head>
<body>
<div class="w-full min-h-screen pb-64 relative bg-cover bg-center" style="
        background-image: url('https://i.ibb.co/m8jcyZR/Hero.png');
      ">
    <div class="relative w-full h-full">
        <div class="flex items-center justify-center py-10 md:px-20 px-4">
            <img src='/krera-logo-2.png' class='w-4/12 md:w-2/12 h-auto object-fill' alt='logo' />
        </div>
        <p
            class="mt-20 text-base md:px-0 px-4 font-medium tracking-widest leading-none text-center text-white uppercase"
        >
            WEBSITE INAUGURATION BY Hon. Minister of Self-Government and Excise, <br />
            <strong>Shri MB Rajesh</strong>
        </p>
        <div class="flex items-center justify-center w-full">
            <form
                class="mx-auto bg-transparent py-12 px-4 w-full"
                id="switch-container"
                method="POST"
                action="{{ route('inaugurate-site') }}"
            >
                @csrf
                <input type="checkbox" id="switch" name="inaugurate" @if ($prod === 'yes')
                    checked
                    @endif>
                <label for="switch" class="mx-auto">
                    <svg
                        class="absolute left-[17px]"
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.625 4.5H7.25V2.625C7.25 2.02826 7.01295 1.45597 6.59099 1.03401C6.16903 0.612053 5.59674 0.375 5 0.375C4.40326 0.375 3.83097 0.612053 3.40901 1.03401C2.98705 1.45597 2.75 2.02826 2.75 2.625V4.5H2.375C1.97731 4.50043 1.59603 4.65861 1.31482 4.93982C1.03361 5.22103 0.875434 5.60231 0.875 6V10.125C0.875434 10.5227 1.03361 10.904 1.31482 11.1852C1.59603 11.4664 1.97731 11.6246 2.375 11.625H7.625C8.02269 11.6246 8.40397 11.4664 8.68518 11.1852C8.96639 10.904 9.12457 10.5227 9.125 10.125V6C9.12457 5.60231 8.96639 5.22103 8.68518 4.93982C8.40397 4.65861 8.02269 4.50043 7.625 4.5V4.5ZM6.5 4.5H3.5V2.625C3.5 2.22718 3.65804 1.84564 3.93934 1.56434C4.22064 1.28304 4.60218 1.125 5 1.125C5.39782 1.125 5.77936 1.28304 6.06066 1.56434C6.34196 1.84564 6.5 2.22718 6.5 2.625V4.5Z"
                            fill="#4338CA"
                        />
                    </svg>

                    <svg
                        class="cross"
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.625 4.5H3.5V2.625C3.5 2.22718 3.65804 1.84564 3.93934 1.56434C4.22064 1.28304 4.60218 1.125 5 1.125C5.39782 1.125 5.77936 1.28304 6.06066 1.56434C6.34196 1.84564 6.5 2.22718 6.5 2.625C6.5 2.72446 6.53951 2.81984 6.60983 2.89016C6.68016 2.96049 6.77554 3 6.875 3C6.97446 3 7.06984 2.96049 7.14017 2.89016C7.21049 2.81984 7.25 2.72446 7.25 2.625C7.25 2.02826 7.01295 1.45597 6.59099 1.03401C6.16903 0.612053 5.59674 0.375 5 0.375C4.40326 0.375 3.83097 0.612053 3.40901 1.03401C2.98705 1.45597 2.75 2.02826 2.75 2.625V4.5H2.375C1.97731 4.50043 1.59603 4.65861 1.31482 4.93982C1.03361 5.22103 0.875434 5.60231 0.875 6V10.125C0.875434 10.5227 1.03361 10.904 1.31482 11.1852C1.59603 11.4664 1.97731 11.6246 2.375 11.625H7.625C8.02269 11.6246 8.40397 11.4664 8.68518 11.1852C8.96639 10.904 9.12457 10.5227 9.125 10.125V6C9.12457 5.60231 8.96639 5.22103 8.68518 4.93982C8.40397 4.65861 8.02269 4.50043 7.625 4.5V4.5Z"
                            fill="#4338CA"
                        />
                    </svg>
                </label>
            </form>
            <style>
                input[type="checkbox"] {
                    visibility: hidden;
                    width: 0;
                    height: 0;
                }

                label {
                    width: 80px;
                    height: 30px;
                    background: #5edb8e;
                    position: relative;
                    cursor: pointer;
                    box-shadow: 1px 3px 9px grey;
                    display: block;
                    border-radius: 100px;
                }

                label svg {
                    position: absolute;
                    z-index: -1;
                    width: 28px;
                    height: 28px;
                    top: -1px;
                    left: 5px;
                    /* transition: all 0.5s linear; */
                }

                label svg.cross {
                    z-index: 1;
                    /* transition: all 0.5s linear; */
                }

                label:after {
                    content: "";
                    width: 40px;
                    height: 40px;
                    background: white;
                    position: absolute;
                    left: 0px;
                    top: -5px;
                    border-radius: 90px;
                    /* transition: 0.8s; */
                }

                input:checked + label {
                    background: #ff8d87;
                }

                input:checked + label svg {
                    z-index: 1;
                    transform: translatex(120%);
                }

                input:checked + label svg.cross {
                    z-index: -10;
                }

                input:checked + label:after {
                    transform: translatex(110%);
                }
            </style>
        </div>
    </div>
</div>
<div
    class="flex items-center w-full xl:justify-end justify-center relative z-20"
>
    <style>
        /* Desktop Slider css below */
        .slider2 {
            width: 100%;
            height: 345px;
            padding-top: 14px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
        }

        .slide-ana2 {
            height: 100%;
        }

        .slide-ana2 > div {
            width: 100%;
            height: 100%;
            position: absolute;
            transition: all 1s;
        }

        @media (min-width: 1200px) and (max-width: 1466px) {
            .slider2 {
                height: 371px;
                width: 100%;
            }
        }

        /* Tablet Slider css below */
        .slider {
            width: 100%;
            height: 345px;
            padding-top: 14px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
        }

        .slide-ana {
            height: 100%;
        }

        .slide-ana > div {
            width: 100%;
            height: 100%;
            position: absolute;
            transition: all 1s;
        }

        @media (min-width: 750px) and (max-width: 1200px) {
            .slider {
                height: 299px;
                width: 95%;
            }
        }

        /* mobile Slider css below */
        .slider3 {
            width: 95%;
            height: 300px;
            padding-top: 14px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
        }

        .slide-ana3 {
            height: 100%;
        }

        .slide-ana3 > div {
            width: 100%;
            height: 100%;
            position: absolute;
            transition: all 1s;
        }

        @media (min-width: 350px) and (max-width: 600px) {
            .slider3 {
                height: 417px;
                width: 100%;
                padding-left: 4px;
                padding-right: 4px;
            }
        }
    </style>
</div>
</body>
<script>
    // Desktop
    let slides2 = document.querySelectorAll('.slide-ana2>div')
    let slideSayisi2 = slides2.length
    let prev2 = document.getElementById('prev2')
    let next2 = document.getElementById('next2')
    for (let index = 0; index < slides2.length; index++) {
        const element = slides2[index]
        element.style.transform = 'translateX(' + 200 * index + '%)'
    }
    let loop2 = 0 + 1000 * slideSayisi2

    function goNext2() {
        loop2++
        for (let index = 0; index < slides2.length; index++) {
            const element = slides2[index]
            element.style.transform =
                'translateX(' + 200 * (index - (loop2 % slideSayisi2)) + '%)'
        }
    }

    function goPrev2() {
        loop2--
        for (let index = 0; index < slides2.length; index++) {
            const element = slides2[index]
            element.style.transform =
                'translateX(' + 200 * (index - (loop2 % slideSayisi2)) + '%)'
        }
    }

    next2.addEventListener('click', goNext2)
    prev2.addEventListener('click', goPrev2)
    // Tablet
    let slides = document.querySelectorAll('.slide-ana>div')
    let slideSayisi = slides.length
    let prev = document.getElementById('prev')
    let next = document.getElementById('next')
    for (let index = 0; index < slides.length; index++) {
        const element = slides[index]
        element.style.transform = 'translateX(' + 200 * index + '%)'
    }
    let loop = 0 + 1000 * slideSayisi

    function goNext() {
        loop++
        for (let index = 0; index < slides.length; index++) {
            const element = slides[index]
            element.style.transform =
                'translateX(' + 200 * (index - (loop % slideSayisi)) + '%)'
        }
    }

    function goPrev() {
        loop--
        for (let index = 0; index < slides.length; index++) {
            const element = slides[index]
            element.style.transform =
                'translateX(' + 200 * (index - (loop % slideSayisi)) + '%)'
        }
    }

    next.addEventListener('click', goNext)
    prev.addEventListener('click', goPrev)
    // Mobile
    let slides3 = document.querySelectorAll('.slide-ana3>div')
    let slideSayisi3 = slides3.length
    let prev3 = document.getElementById('prev3')
    let next3 = document.getElementById('next3')
    for (let index = 0; index < slides3.length; index++) {
        const element = slides3[index]
        element.style.transform = 'translateX(' + 200 * index + '%)'
    }
    let loop3 = 0 + 1000 * slideSayisi3

    function goNext3() {
        loop3++
        for (let index = 0; index < slides3.length; index++) {
            const element = slides3[index]
            element.style.transform =
                'translateX(' + 200 * (index - (loop3 % slideSayisi3)) + '%)'
        }
    }

    function goPrev3() {
        loop3--
        for (let index = 0; index < slides3.length; index++) {
            const element = slides3[index]
            element.style.transform =
                'translateX(' + 200 * (index - (loop3 % slideSayisi3)) + '%)'
        }
    }

    next3.addEventListener('click', goNext3)
    prev3.addEventListener('click', goPrev3)

    const MenuHandler = (flag) => {
        if (flag) {
            document.getElementById('list').classList.add('top-100')
            document.getElementById('list').classList.remove('hidden')
            document.getElementById('close').classList.remove('hidden')
            document.getElementById('open').classList.add('hidden')
            document.getElementById('open2').classList.add('hidden')
        } else {
            document.getElementById('list').classList.remove('top-100')
            document.getElementById('list').classList.add('hidden')
            document.getElementById('close').classList.add('hidden')
            document.getElementById('open').classList.remove('hidden')
            document.getElementById('open2').classList.remove('hidden')
        }
    }
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script>
    $('#switch').on('change', (e) => {
        setTimeout(() => {
            $('form#switch-container').submit()
        }, 1000)
    })
</script>
</html>
