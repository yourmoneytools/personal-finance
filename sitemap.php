<?php

header("Content-Type: application/xml; charset=utf-8");

$base = "https://cashtools.org";

$urls = [
    "/",
    "/blogs",
    "/tools",
    "/cd-calculator",
    "/monthly-expense-calculator",
    "/emergency-fund-calculator",
    "/burn-rate-runway-calculator",
    "/savings-goal",
    "/buy-vs-rent-calculator"
];


$posts = glob(__DIR__ . "/blogs/*.json");


foreach ($posts as $file) {

    $post = json_decode(file_get_contents($file), true);

    if ($post && isset($post["slug"])) {
        $urls[] = "/blogs/" . $post["slug"];
    }

}


echo '<?xml version="1.0" encoding="UTF-8"?>';

?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<?php foreach($urls as $url): ?>

<url>
    <loc><?= $base . $url ?></loc>
    <lastmod><?= date("Y-m-d") ?></lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
</url>

<?php endforeach; ?>

</urlset>