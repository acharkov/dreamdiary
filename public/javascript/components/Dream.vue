<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{ dream.date }}</h3>
        </div>
        <div class="panel-body">
              {{ dream.text }}
            <div class="pull-down">
                <div class="pull-right">
                    <button class="btn btn-success">Edit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['dream']
}
</script>

<style>

</style>
