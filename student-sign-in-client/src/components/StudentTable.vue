<template>
    <div>
        <div class="card student-list m-2 p-2">
            <h4 class="card-title">Student List</h4>
            <div class="edit-table-toggle form-check">
                <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
                <label for="edit-table" class="form-check-label">Edit Table?</label>
            </div>
            <div id="student-table">
                <table class="table">
                    <tr>
                        <th>Name</th>
                        <th>StarID</th>
                        <th>Present?</th>
                        <th v-show="editTable">Delete</th>
                    </tr>

                   <!-- TODO create table rows 
                   Each row will have a checkbox, bound to the app's data 
                   When the checkbox is checked/unchecked, the student will be signed in/out -->

                   <student-row 
                   v-for='student in students' 
                   v-bind:student="student"
                   v-bind:edit="editTable"
                   v-bind:key="student.starID"
                   v-on:student-arrived-or-left="arrivedOrLeft"
                   v-on:delete-student="deleteStudent">
                   </student-row>

                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import StudentRow from '@/components/StudentRow.vue'
    export default {
        name:'studentTable',
        components: {
            StudentRow
        },
        emits: ['student-arrived-or-left'],
        props: {
            students: Array 
        },
        data() {
            return {
                editTable: false,
            }
        },
        methods: {
            arrivedOrLeft(student, present) {
                //TODO emit message to parents
                this.$emit('student-arrived-or-left', student, present)
            },
            deleteStudent(student) {
                this.$emit('delete-student', student)
            }
        }
    }
</script>

<!--"scoped" means this style will be contained t this component-->
<style scoped> 



</style>