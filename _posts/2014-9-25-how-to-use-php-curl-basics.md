---
layout: postlayout
title: How to Use PHP/cURL - The Basics
labels: [php,curl]
thumbnail: https://etelej.github.io/images/logos/phpcurl.png
---
<p>cURL is a powerful tool for transferring data across various protocols like http, ftp, gopher, file telnet among others. PHP provides support for cURL through the libcurl library as made available through the <code>php_curl</code> extension. In order to make use of the following tutorial, you need to have PHP on your server and it's php_curl extension enabled <i>(enabled by most webhosts)</i>.</p>
<p style='padding:5px; margin:0;'><b>Jump to Section:</b></p>
<div class='jumplist'>
<a href='#curl-basic-usage' class='inlink'>PHP cURL - Basic Usage</a> <a href='#curl-init' class='inlink'>Initiliaze cURL</a> <a href='#curl-options' class='inlink'>Set cURL Options</a> <a href='#curl-exec' class='inlink'>Execute cURL Session</a> <a href='#curl-errors' class='inlink'>Handle cURL Errors</a> <a href='#curl-close' class='inlink'>Close cURL Session</a> <a href='#curl-tips-tricks-mistakes' class='inlink'>Tips, Tricks and Common Mistakes</a> <a href='#curl-tutorials' class='inlink'>Advanced cURL tutorials</a>
</div>

<p><b>Is there an easier way to do all this?</b></p>
<p>I'd like to point out that while cURL may be the best way carry out data transfer across protocols in PHP, that does not mean it is the <b>easiest</b> or <b>most efficient</b>. If you're looking for an easier and <i>safer</i> way to perform HTTP requests, I'd recommend checking out <a href='http://guzzle.readthedocs.org/en/latest/' title="Check out Guzzle's documentation"><b>Guzzle</b></a>.</p>
<section id="curl-basic-usage">

<h2>cURL Basic Usage</h2>
{% highlight php lineos %}
<?php

//initialize cURL Session - create resource
$curl_handle = curl_init();

// Setting up a single curl option (curl_setopt)
curl_setopt($curl_handle, CURLOPT_URL, "https://php.net");
curl_setopt($curl_handle, CURLOPT_VERBOSE, true);

// (OR) Setting up mutiple options (curl_setopt_array)
curl_setopt_array($curl_handle, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER => false
));

// Executing curl request and storing response
$output = curl_exec($curl_handle);

//Checking for errors
if ($output === FALSE) {
    echo "cURL Error: " . curl_error($curl_handle);
}
// (Optional) Close cURL Session - free up handle
curl_close($curl_handle);
{% endhighlight %}
</section>

<h3>Working with PHP cURL</h3>
<section id="curl-init">
<h4>Initializing cURL - <code>curl_init()</code></h4>
<p>Initializes cURL session and <b>returns</b> a handle for accessing the session.</p>
{% highlight php lineos %}
<?php

//Syntax description
resource curl_init ([ string $url = NULL ] )

//Example
$curl_handle = curl_init();

//OR setting the cURL session URL on init
$curl_handle = curl_init("http://php.net/");
{% endhighlight %}
<p>If <code>$url</code> is provided it's value is set as the cURL session's <b>CURLOPT_URL</b> as would have been defined by the <code>curl_setopt</code> function <i>(see below)</i>. It <b>Returns</b> a cURL resource handle on success or <code>FALSE</code> on errors.</p>
</section>
<section id="curl-options">
<h4>Setting cURL Options - <code>curl_setopt</code></h4>
<p>Syntax description for setting options</p>
{% highlight php lineos %}
<?php

//using curl_setopt
bool curl_setopt ( resource $curl_handle , int $option , mixed $value )
//OR Using curl_setop_array
bool curl_setopt_array ( resource $curl_handle , array $options )
{% endhighlight %}
<p>Examples</p>
{% highlight php lineos %}
<?php

//Example 1, Setting curl_setopt options for downloading file via FTP
curl_setopt($curl_handle, CURLOPT_URL, 'ftp://ftp.ftpaddress.com/filelocation/file.txt');
curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl_handle, CURLOPT_USERPWD, 'username:password');

//Example 2, Using curl_setopt_array
curl_setopt_array($curl_handle, array(
    CURLOPT_URL => 'ftp://ftp.ftpaddress.com/filelocation/file.txt',
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_USERPWD => 'username:password'
));
{% endhighlight %}
<h5>Commonly used PHP/cURL Options</h5>
<p>For all <code>curl_setopt</code>/<code>curl_setopt_array</code> options, kindly visit PHP's curl_setopt documentation page (<a href='http://php.net/manual/en/function.curl-setopt.php' title='Go to PHP Docs: curl_setopt'>here</a>). The list below shows the option name and the value and use. e.g If CURLOPT_AUTOREFERER is set to TRUE cURL will follow a Location: redirect.</p>
<p>The options listed below require boolean values.The default values are FALSE unless explicitly stated:</p>
<ul>
<li><b>CURLOPT_AUTOREFERER</b> - If TRUE cURL will follow a <i>Location:</i> redirect</li>
<li><b>CURLOPT_COOKIESESSION</b> - If TRUE forces a new cookie session</li>
<li><b>CURLOPT_CONNECT_ONLY</b> - (PHP > 5.5) If TRUE performs connection but no data is transferred </li>
<li><b>CURLOPT_FAILONERROR</b> - If TRUE fail verbosely if the HTTP code returned is greater than or equal to 400</li>
<li><b>CURLOPT_CRLF</b> - If TRUE convert Unix newlines to CRLF newlines on transfers</li>
<li><b>CURLOPT_FILETIME</b> - If TRUE attempt to retrieve the modification date of the remote document</li>
<li><b>CURLOPT_FRESH_CONNECT</b> - If TRUE force the use of a new connection instead of a cached one</li>
<li><b>CURLOPT_HEADER</b> - If TRUE include the header in the output</li>
<li><b>CURLOPT_NOBODY</b> - If TRUE exclude the body from the output. Sets request method to HEAD</li>
<li><b>CURLOPT_POST</b> - If TRUE do a regular HTTP POST (eg as used by forms)</li>
<li><b>CURLOPT_RETURNTRANSFER</b> - If TRUE return the transfer as a string, if FALSE, return TRUE or FALSE on success</li>
<li><b>CURLOPT_SSL_VERIFYPEER</b> - If TRUE <i>[default value]</i> cURL must verify the peer's certificate</li>
<li><b>CURLOPT_VERBOSE</b> - If TRUE output verbose information</li>
</ul>
<p>This list includes options that require <code>integer</code> values</p>
<ul>
<li><b>CURLOPT_CONNECTTIMEOUT</b> - number of seconds to wait while trying to connect. Use 0 to wait indefinitely. (To use microseconds, if on PHP > 5.2.3 use CURLOPT_CONNECTTIMEOUTMS )</li>
<li><b>CURLOPT_RESUME_FROM</b> - offset, in bytes, to resume a transfer from</li>
<li><b>CURLOPT_TIMEOUT</b> - maximum number of seconds to allow cURL functions to execute (on PHP > 5.2.3 CURLOPT_TIMEOUT_MS) </li>
</ul>
<p>This list includes options that require <code>string</code> values</p>
<ul>
<li><b>CURLOPT_URL</b> - URL to fetch. This can also be set when initializing a session with <code>curl_init()</code></li>
<li><b>CURLOPT_USERAGENT</b> - contents of the <code>User-Agent:</code> header to be used in a HTTP request</li>
<li><b>CURLOPT_REFERER</b> - contents of the <code>Referer:</code> header to be used in a HTTP request</li>
<li><b>CURLOPT_POSTFIELDS</b> - full data to post in a HTTP "POST" operation</li>
<li><b>CURLOPT_USERPWD</b> - username and password formatted as <code>[username]:[password]"</code> to use for the connection</li>
<li><b>CURLOPT_CUSTOMREQUEST</b> - custom request method to use instead of "GET" or "HEAD" when doing a HTTP request</li>
<li><b>CURLOPT_PROXY</b> - HTTP proxy to tunnel requests through</li>
<li><b>CURLOPT_PROXYUSERPWD</b> - username and password formatted as <code>[username]:[password]"</code> for proxy</li>
</ul>
<p>This list includes options that require <code>array</code> values</p>
<ul>
<li><b>CURLOPT_HTTPHEADER</b> - array of HTTP header fields to set, in the format <code>array('Content-type: text/plain', 'Content-length: 100')</code></li>
</ul>
</section>
<section id='curl-exec'>
<h4>Executing cURL session - <code>curl_exec</code></h4>
<p>Executes given cURL session. The cURL session should already be initialized and have set options.</p>
<p><b>RETURNS</b> <code>TRUE</code> on success and <code>FALSE</code>
<br/><i>NOTE:</i> if <b>CURLOPT_RETURNTRANSFER</b> is set (whether TRUE or FALSE) in the <a href='#curl-options'>session options</a>, <code>curl_exec</code> will return raw content fetched on success.</p>
{% highlight php lineos %}
<?php

//Syntax Description
mixed curl_exec ( resource $curl_handle )

//Example
$result  = curl_exec($curl_handle);
{% endhighlight %}
</section>
<section id='curl-errors'>
<h4>Handling Errors</h4>
<p>Testing for errors can be done through the cURL session, but usually done <code>curl_exec</code></p>
{% highlight php lineos %}
<?php

//Basic Error Checking
$result = curl_exec($curl_handle);
if ( $result === FALSE){
    echo 'cURL Error: ' . curl_error($curl_handle); //echoes last session error
}

//If you want to check out information regarding the session
var_dump(curl_getinfo($curl_handle));
{% endhighlight %}
</section>
<section id='curl-close'>
<h4>Closing cURL Session <code>curl_close</code></h4>
<p>Closing cURL session - Frees up all session resources; the cURL handle is also deleted</p>
{% highlight php lineos %}
<?php
//syntax description
void curl_close ( resource $curl_handle )

//usage
curl_close($curl_handle);
{% endhighlight %}
</section>
<section id='useful-curl-functions'>
<h3>Other Useful PHP cURL Functions:</h3>
<p>While you may not require them in your workflow, here's a set of other useful PHP cURL functions that may not have featured in the examples above:</p>
<ul>
<li><code>curl_copy_handle</code> - Copy cURL (handle along with its options)</li>
<li><code>curl_strerror</code> - Return string describing the given error code</li>
<li><code>curl_pause</code> - Pause and unpause a connection</li>
<li><code>curl_reset</code> - Reset all options of a libcurl session handle</li>
<li><code>curl_share_init</code> - Initialize a  <a href='http://php.net/manual/en/function.curl-multi-init.php' title='Go to PHP Docs curl_share_handle'>cURL share handle</a></li>
<li><code>curl_multi_init</code> - Returns a new cURL <a href='http://php.net/manual/en/function.curl-multi-init.php' title='Go to PHP Docs curl_multi_init'>multi handle</a></li>
<li><code>curl_version</code> - Gets cURL version information</li>
</ul>
</section>
<section id='curl-tips-tricks-mistakes'>
<h3>PHP cURL Tips, Tricks and Common Mistakes</h3>
<p>Here are several tips to make help you use cURL better:</p>
<ul>
<li>Remember to <code>url_encode()</code> URLs before using as <code>curl_init()</code> parameter or setting as <b>CURLOPT_URL</b></li>
</ul>
<h4>Common cURL Errors and Mistakes</h4>
<p>SSL Verification error when accessing secure URL, esp from localhost</p>
<code>SSL certificate problem: unable to get local issuer certificate</code>
<p>Cause: In cURL > 7.10, SSL verification is enabled by default, the error may arise if your system does not have up to date Certificate Authorities or the remote server certificate is not properly set up.</p>
<p>Solution:</p>
<ul>
    <li><b>For PHP > 5.3.7</b>
        <br/>Download a list file with an up-to-date certificate authorities (<a href='http://curl.haxx.se/ca/cacert.pem'>this page</a>), and upload it to your server and add absolute location to your <b>php.ini</b>:
        <br/><code>curl.cainfo=&lt;path-to&gt;cacert.pem</code>
        <br/>Restart your web server, and it'll work!
    </li>
    <li><b>OR</b> (<i>NOT recommended</i>) - Do not use unless absolutely necessary as it opens up your system to a man-in-the-middle attack
    <br/>Set the <span><code class='inline'>curl_setopt</code></span> option <code>CURLOPT_SSL_VERIFYPEER</code> to <code>FALSE</code>
    </li>
</ul>
<p>Other Common Solutions/Mistakes when working with cURL on PHP</p>
<ul>
<li>Your server does not have php_curl extension installed or enabled. Use <code>function_exists('curl_init')</code>, to quickly check if the extension is active.</li>
<li>Remember to valid/<b>filter</b> all data received through cURL request before using them</li>
</ul>
</section>
<section id="curl-tutorials">
   <h6>Advanced PHP cURL Library Tutorial</h6>
    <p>Here's an advanced tutorial with an in-depth look at handling cURL request with PHP:</p>
    <ul>
        <li><a href="http://code.tutsplus.com/tutorials/techniques-for-mastering-curl--net-8470">Techniques for Mastering cURL - <b>Tutsplus</b></a></li>
        <li><a href="http://php.net/manual/en/book.curl.php">cURL Library Documentation - <b>PHP Docs</b></a></li>
    </ul>
</section>
<p>Maybe I missed something; leave a comment below with your thoughts.</p>
