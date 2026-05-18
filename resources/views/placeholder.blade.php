<!-- Component Code -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="./assets/css/style.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
    />
    <style>
        body {
            font-family: "Poppins", sans-serif !important;
        }
    </style>
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
    <title>K-RERA</title>
</head>
<body>
<script>
    // Set the date we're counting down to
    var countDownDate = new Date("{{ $date }}").getTime()

    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime()

        // Find the distance between now and the count down date
        var distance = countDownDate - now

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24))
        var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        )
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((distance % (1000 * 60)) / 1000)

        // Output the result in an element with id="demo"
        document.getElementById('demo').innerHTML =
            days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '

        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x)
            document.getElementById('demo').innerHTML = 'EXPIRED'
        }
    }, 1000)
</script>
<script>
    setTimeout(function() {
        window.location.href = 'https://archive.rera.kerala.gov.in/'
    }, 20000)
</script>

<div
    class="relative min-h-screen w-full flex  bg-cover bg-center text-center py-10"
    style="
        background-image: url('/splash.avif');
      "
>
    <div
        class=" z-50 flex flex-col text-white w-full gap-5"
    >
        <div class='flex justify-center'>
            <img src='/krera-logo-2.png' class='w-4/12 md:w-2/12 h-auto object-fill' alt='logo' />
        </div>
        <h1 class="text-3xl mt-5">
            We Are Changing, Making K-RERA’s <br /> Data Accessible Like Never Before.
        </h1>
        <p class="">
            <strong>K-RERA's New Website</strong> is set to revolutionize the Real Estate landscape in Kerala.<br />
            The website will be launched by Shri MB Rajesh, the Honorable Minister for Local Self-Government and
            Excise,<br />
            on May 17, 2023, at 11:30 AM.
        </p>
        <p id="demo" class="text-6xl"></p>
        <p>
            <i
            >If you are not automatically redirected in 20
                seconds, please click </i
            ><b><a href="https://archive.rera.kerala.gov.in/">here</a></b
            >.
        </p>
    </div>
</div>
</body>
</html>
