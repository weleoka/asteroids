<?php
  $d = explode("/", trim($path, "/"));
  $srcUrl = '../../../source.php?dir=webroot/otherTests/BTHtests/' . end($d) . '&amp;file=' . basename($_SERVER["PHP_SELF"]) . '#file';
?>

<footer id='footer'>
<p><em>"Hey Luke, use the <a href='<?=$srcUrl?>'>source</a>."</em></p>

</footer>
<script src="js/req/jquery-2.1.3.js"></script>

<script src="js/req/AnimationFrame.min.js"></script>
<script src="js/req/FpsMeter.js"></script>

<script src="js/forces_vectors.js"></script>
<script src="js/space.js"></script>
<script src="js/player.js"></script>
<script src="js/bullet.js"></script>
<script src="js/monster.js"></script>
<script src="js/main.js"></script>


</body>
</html>

<?php

/*

<script src="js/req/jquery-ui.min.js"></script>
<script src="js/req/jquery.highlightonce.js"></script>
<script src="js/req/mos.js"></script>
<script src="js/req/kai.js"></script>
*/
?>