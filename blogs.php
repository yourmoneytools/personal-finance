<!-- blog.html -->
<!-- here you will render files dinamically -->
<!-- add a filter for new to old, old to new etc. -->

<?php

$posts = [];

// foreach (glob(__DIR__ . "/blogs/*.json") as $file) {
//     $post = json_decode(file_get_contents($file), true);

//     if ($post) {
//         $posts[] = $post;
//     }
// }

// usort($posts, function ($a, $b) {
//     return strtotime($b["date"]) - strtotime($a["date"]);
// });

// echo "<pre>";
// print_r(glob(__DIR__ . "/blogs/*.json"));
// echo "</pre>";
// exit;

// foreach (glob(__DIR__ . "/blogs/*.json") as $file) {

//     $raw = file_get_contents($file);
//     $post = json_decode($raw, true);

//     if (!$post) {
//         echo "<pre>JSON ERROR in: $file</pre>";
//         echo json_last_error_msg();
//         exit;
//     }

//     $posts[] = $post;
// }

foreach (glob(__DIR__ . "/blogs/*.json") as $file) {

    $raw = file_get_contents($file);
    $post = json_decode($raw, true);

    if ($post === null) {
        echo "<pre>";
        echo "❌ JSON ERROR in: " . $file . "\n\n";
        echo json_last_error_msg() . "\n\n";
        echo "----- FIRST 300 CHARS -----\n";
        echo substr($raw, 0, 300);
        echo "</pre>";
        exit;
    }

    $posts[] = $post;
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Personal Finance Blog & Money Management Tips - Cash Tools</title>
        <meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Explore personal finance articles, budgeting tips, savings strategies, financial guides to help make smarter money decisions and improve your financial future.">
        <link rel="icon" href="favicon.ico">
        <link rel="icon" href="assets/cash-tools-favicon.png" type="image/png">
        <link rel="canonical" href="https://cashtools.org/blogs.php">

        <meta property="og:title" content="Personal Finance Blog & Money Management Tips - Cash Tools" />
		<meta property="og:description" content="Explore personal finance articles, budgeting tips, savings strategies, financial guides to help make smarter money decisions and improve your financial future." />
		<meta property="og:url" content="https://cashtools.org/blogs.php" />
		<meta property="og:type" content="website" />

        <script src="external-scripts.js"></script>

        <link rel="stylesheet" href="homepage.css">
        <link rel="stylesheet" href="base.css">
        <link rel="stylesheet" href="nav.css">
        <link rel="stylesheet" href="footer.css">
		<link rel="stylesheet" href="tools.css">
		<link rel="stylesheet" href="blogs.css">

        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "<?= htmlspecialchars($blog['h1']) ?>",
                "description": "<?= htmlspecialchars($blog['metaDescription']) ?>",
                "datePublished": "<?= htmlspecialchars($blog['date']) ?>",
                "author": {
                    "@type": "Organization",
                    "name": "Cash Tools"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Cash Tools"
                },
                "image": "https://cashtools.org<?= htmlspecialchars($blog['featured_image']) ?>"
            }
        </script>
    </head>
    <body>
        <!-- Google tag (gtag.js) -->
		 <!-- scripts -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-HGW5X87VBP"></script>
		<script src="external-scripts.js"></script>
		<!-- end scripts -->

        <div class="page-wrap">
			<?php include 'header.php'; ?>

			<div class="content blog-content">
				<div class="content-wrap">
					<h1>Our Blog</h1>
                    <p> Welcome to our blog, where we share insightful articles and practical 
                        tips on personal finance, investing, and smart money management to help
                         you achieve your financial goals.</p>
				</div>
                <div class="blog-list">

                    <?php foreach ($posts as $post): ?>

                    <div class="blog-block">
                        <a href="/blog.php?slug=<?= urlencode($post["slug"]) ?>">
                            <div class="blog-image-wrap">
                                <img
                                    src="<?= htmlspecialchars($post["featured_image"]) ?>"
                                    alt="<?= htmlspecialchars($post["featured_image_alt"]) ?>">
                            </div>

                            <div class="blog-copy-wrap">

                                <p class="blog-date">
                                    <?= date("F j, Y", strtotime($post["date"])) ?>
                                </p>

                                <h2><?= htmlspecialchars($post["h1"]) ?></h2>

                                <p><?= htmlspecialchars($post["excerpt"]) ?></p>

                                <div class="blog-button">
                                    <p>Read More</p>
                                    <img src="assets/arrow-angle-white-3.png" alt="">
                                </div>

                            </div>
                        </a>
                    </div>

                    <?php endforeach; ?>

                    </div>

			</div>

            
			<?php include 'footer.php'; ?>


			<script src="nav.js"></script>
            <script src="posts.js"></script>
            
        </div>


    </body>
</html>