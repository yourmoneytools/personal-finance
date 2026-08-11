<!-- this is the backbone for each of the blogs, in json file  -->

<?php

$slug = $_GET['slug'] ?? '';

if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
    http_response_code(404);
    die("Blog not found.");
}

$file = "blogs/$slug.json";

$blog = json_decode(file_get_contents($file), true);

if (!$blog) {
    http_response_code(404);
    die("Invalid blog data.");
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?= htmlspecialchars($blog["title"]) ?></title>
        <meta name="description" content="<?= htmlspecialchars($blog["metaDescription"]) ?>">
        <link rel="canonical" href="<?= htmlspecialchars($blog["canonical"]) ?>">
        <link rel="icon" href="favicon.ico">
        <link rel="icon" href="/assets/cash-tools-favicon.png" type="image/png">

        <!-- Open Graph -->
        <meta property="og:type" content="article">
        <meta property="og:title" content="<?= htmlspecialchars($blog["title"]) ?>">
        <meta property="og:description" content="<?= htmlspecialchars($blog["metaDescription"]) ?>">
        <meta property="og:url" content="<?= htmlspecialchars($blog["canonical"]) ?>">
        <meta property="og:image" content="https://cashtools.org/<?= ltrim($blog["featured_image"], './') ?>">
    
        <script src="/external-scripts.js"></script>

        <link rel="stylesheet" href="/homepage.css">
        <link rel="stylesheet" href="/base.css">
        <link rel="stylesheet" href="/nav.css">
        <link rel="stylesheet" href="/footer.css">
		<link rel="stylesheet" href="/tools.css">
		<link rel="stylesheet" href="/blogs.css">
    </head>

    <body>

        <?php include 'header.php'; ?>

        <div class="content blog-content">
            <div class="content-wrap">
                <div class="blog-wrap">
                    <div class="top-blog">
                        <h1><?= htmlspecialchars($blog["h1"]) ?></h1>
                        <div class="date"><?= htmlspecialchars($blog["date"]) ?> </div>
                        <div class="tags">
                            <?php foreach($blog["tags"] as $tag): ?>
                            <div class="tag"><?= htmlspecialchars($tag) ?></div>
                            <?php endforeach; ?>
                        </div>
                        </div>
                        <div class="bottom-blog">
                        <div class="blog-img"><img src="<?= htmlspecialchars($blog["featured_image"]) ?>" alt="<?= htmlspecialchars($blog["featured_image_alt"]) ?>"></div>
                        <div class="blog-copy"><?= $blog["content"] ?></div>
                    </div>
                </div>
            </div>
        </div>

        <?php include 'footer.php'; ?>

    </body>

</html>