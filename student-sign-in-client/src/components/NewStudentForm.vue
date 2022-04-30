<template>
    <div>
        <!--Template HTML here-->

        <div class="alert alert-danger" v-if="errors.length > 0">
        <ul>
        <li v-for="error in errors">{{error}}</li>
        </ul>
        </div>


        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                
                <input id="name" class="form-control" v-model.trim='newStudentName'>
            </div>
            <div class="form-group">
            <label for="starID">Star ID</label>
                
            <input id="starID" class="form-control" v-model.trim='newStarID'>
            </div>
            
            <button class="btn btn-primary" v-on:click="addStudent">Add</button>
        </div>
    </div>
</template>

<script>
    export default {
        name:'newStudentForm',
        emits: ['student-added'],
        data() {
            return {
                newStudentName: '',
                newStarID: '',
                errors: []
            }
        },
        methods: {
            addStudent() {
                    this.errors = []    //clear errors array

                    if (!this.newStudentName) {
                        this.errors.push('Student name must be entered')
                    }

                    if (!this.newStarID) {
                        this.errors.push('StarID must be entered')
                    }

                    //if there are no errors...
                    if (this.errors.length == 0) {
                        let student = {name: this.newStudentName, starID: this.newStarID, present: false}
                        
                        //emit message to parent with new student
                        this.$emit('student-added', student)

                        this.newStudentName = ''
                        this.newStarID = ''
                    }
            }
        }

    }
</script>

<!--"scoped" means this style will be contained t this component-->
<style scoped>  

</style>