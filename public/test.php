<?php
set_time_limit(0);

$base  = "https://rera.kerala.gov.in/";
$host  = parse_url($base, PHP_URL_HOST);
$limit = 500;
$skip  = ['pdf','jpg','jpeg','png','gif','zip','doc','docx','xls','xlsx','mp4'];

$seen  = [];
$queue = [$base];

function fetch($url) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_USERAGENT      => 'sitemap-gen',
        CURLOPT_SSL_VERIFYPEER => false,
    ]);
    $html = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    curl_close($ch);
    if ($code !== 200 || stripos((string)$type, 'text/html') === false) return false;
    return $html;
}

function absolutize($href, $current) {
    $href = trim(strtok($href, '#'));
    if ($href === '' || preg_match('#^(mailto:|tel:|javascript:)#i', $href)) return null;
    if (preg_match('#^https?://#i', $href)) return $href;
    $p = parse_url($current);
    $root = $p['scheme'] . '://' . $p['host'];
    if (strpos($href, '//') === 0) return $p['scheme'] . ':' . $href;
    if ($href[0] === '/') return $root . $href;
    $dir = isset($p['path']) ? preg_replace('#/[^/]*$#', '/', $p['path']) : '/';
    return $root . $dir . $href;
}

while ($queue && count($seen) < $limit) {
    $url = array_shift($queue);
    if (isset($seen[$url])) continue;

    $html = fetch($url);
    if ($html === false) continue;
    $seen[$url] = true;

    libxml_use_internal_errors(true);
    $dom = new DOMDocument();
    $dom->loadHTML($html);
    foreach ($dom->getElementsByTagName('a') as $a) {
        $link = absolutize($a->getAttribute('href'), $url);
        if (!$link) continue;
        $path = parse_url($link, PHP_URL_PATH) ?? '';
        $ext  = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        if (parse_url($link, PHP_URL_HOST) === $host
            && !in_array($ext, $skip)
            && !isset($seen[$link])) {
            $queue[] = $link;
        }
    }
}

$today = date('Y-m-d');
$xml  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach (array_keys($seen) as $u) {
    $xml .= "  <url><loc>" . htmlspecialchars($u, ENT_XML1) . "</loc><lastmod>$today</lastmod></url>\n";
}
$xml .= "</urlset>\n";

file_put_contents(__DIR__ . '/sitemap.xml', $xml);
echo count($seen) . " URLs written to sitemap.xml\n";