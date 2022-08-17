<?php $v->layout("_theme"); ?>
<form action="<?= url() ?>" enctype="multipart/form-data">
    <section class="container">
        <section class="container_main">
            <!--||||||||||||||||| HEADER ||||||||||||||||||| -->
            <header>
                <button class="save submit" data-url="<?= url('/gravar') ?>" data-method="POST">Gravar</button>
                <button class="read submit" data-url="<?= url('/ler') ?>" data-method="GET">Ler</button>
                <div class="input_name">
                    <label for="name">Nome:</label>
                    <input id="name" type="text" name="name">
                    <button class="includePeople">Incluir</button>
                </div>
            </header>
            <!--||||||||||||||||| PESSOAS ||||||||||||||||||| -->
            <article class="container_people">
                <header>
                    <h1>Pessoas</h1>
                </header>
            </article>
            <!--||||||||||||||||| TEXT AREA ||||||||||||||||||| -->
            <textarea name="dataJson" readonly="readonly" class="textContainer" cols="70" rows="35">
{
        "pessoas": []
}
            </textarea>
        </section>
    </section>
</form>


