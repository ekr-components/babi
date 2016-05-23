# babi

Short for "Big-Ass Background Image". This component will populate, as a
background image, an appropriately sized image based on the width of the
containing element.  The appropriate image will be swapped out on resize if
necessary.

## How to use the component

The `babi` component requires three attributes: `data-babi-default`,
`data-babi-tablet`, and `data-babi-mobile`.

```html
<div 
	data-component="babi"
	data-babi-default="image.jpg"
	data-babi-tablet="image-tablet.jpg"
	data-babi-mobile="image-mobile.jpg">
	<h1>Content goes here</h1>
	<p>Lorem ipsum dolor sit amet.</p>
</div>
```

### Wordpress

Creating the different image sizes can be quite easy with images uploaded to
Wordpress. Just add the following code to the `functions.php` file.

```php
// Add thumbnail support
add_theme_support('post-thumbnails');

// Add additional image sizes
add_image_size('mobile', 480);
add_image_size('tablet', 800);
```

Note: These images are for standard sizes. If you wanted to take "retina"-style
high density mobile displays, double the size number.

If you are using Advanced Custom Fields, set the image field to return an
"image array". Then, the final component code would look something like this: 

```php
<?php $image = get_field('image') ?>
<div 
	data-component="babi"
	data-babi-default="<?= $image['url'] ?>"
	data-babi-tablet="<?= $image['sizes']['tablet'] ?>"
	data-babi-mobile="<?= $image['sizes']['mobile'] ?>">
	<h1>Content goes here</h1>
	<p>Lorem ipsum dolor sit amet.</p>
</div>
```
