<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="assets/css/style.min.css">
    <title>Test task</title>
</head>
<body>
<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Data</th>
            <th>SubData</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($maintableData as $data) { ?>
            <tr data-id="<?= $data['id']?>" class="dataset">
                <td><?= $data['id']?></td>
                <td class="data"><?= $data['data']?></td>
                <td id="sub-data-<?= $data['id']?>">-</td>
            </tr>
        <?php } ?>
    </tbody>
</table>
<div class="popup">
    <div class="substrate"></div>
    <div class="container-popup">
        <div class="title-popup"></div>
        <div class="close-popup">X</div>
        <div class="content-popup">
            <table></table>
            <div class="help-flex">
                <p id="sum">0</p>
                <button class="btn btn-add-sub-row">Добавить</button>
                <button class="btn btn-save">Cохранить</button>
            </div>
        </div>
    </div>

</div>
<script src="assets/js/index.min.js"></script>

</body>
</html>