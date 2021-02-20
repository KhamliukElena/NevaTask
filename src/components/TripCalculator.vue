<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-5">
                <label for="route">Выберите направление:</label>
                <select v-model="route" 
                        v-on:change="switchOptions" 
                        name="route" id="route">
                    <option value="из A в B">из A в B</option>
                    <option value="из B в A">из B в A</option>
                    <option value="из A в B и обратно в А">из A в B и обратно в А</option>
                </select>
            </div>
            <div class="col-md-7">
                <div class="row">
                    <label for="time1">Выберите время:</label>
                    <select disabled
                        v-model="time1"
                        v-on:change="backRoute"
                        name="time1" id="time1">
                        <option value="18:00(из A в B)">{{this.ABdefault[0].toString()}}</option>
                        <option value="18:30(из A в B)">{{this.ABdefault[1].toString()}}</option>
                        <option value="18:45(из A в B)">{{this.ABdefault[2].toString()}}</option>
                        <option value="19:00(из A в B)">{{this.ABdefault[3].toString()}}</option>
                        <option value="19:15(из A в B)">{{this.ABdefault[4].toString()}}</option>
                        <option value="21:00(из A в B)">{{this.ABdefault[5].toString()}}</option>
                    </select>
                </div>
                <div class="row">
                    <label for="time2">Выберите время:</label>
                    <select disabled 
                    v-model="time2"
                        v-on:change="hideRes"
                        name="time2" id="time2">
                        <option value="18:30(из B в A)">{{this.BAdefault[0].toString()}}</option>
                        <option value="18:45(из B в A)">{{this.BAdefault[1].toString()}}</option>
                        <option value="19:00(из B в A)">{{this.BAdefault[2].toString()}}</option>
                        <option value="19:15(из B в A)">{{this.BAdefault[3].toString()}}</option>
                        <option value="19:35(из B в A)">{{this.BAdefault[4].toString()}}</option>
                        <option value="21:50(из B в A)">{{this.BAdefault[5].toString()}}</option>
                        <option value="21:55(из B в A)">{{this.BAdefault[6].toString()}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5">
                <label for="quantity">Количество билетов:</label>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-3">
                <input class="form-control" type="number" id="quantity" min="1" value="1" v-on:blur="this.validateQuantity">
            </div>
            <div class="col-md-2"></div>
        </div>
        <div class="row">
            <p class="message error">{{msg}}</p>
        </div>
        <div class="row">
            <div class="col-md-5"></div>
            <button type="button" class="btn btn-primary col-md-2" id="calc" v-on:click="this.calcSum()">Рассчитать</button>
            <div class="col-md5"></div>
        </div>
        <div class="row res">
            <p class="text-justify">Количество билетов {{this.quantity}} по маршруту {{this.route}} стоимостью {{this.sum}}.
               Время в пути {{this.tripDuration}} минут. Время отправления: {{this.startTime.toString()}}, время прибытия: {{this.finishTime.toString()}}.
            </p>
            <p v-if="this.route == 'из A в B и обратно в А'" class="text-justify">
                Время отправления обратного рейса: {{this.backTripInfo.startTime.toString()}}, прибытие в {{this.backTripInfo.finishTime.toString()}}. Время в пути составит {{this.tripDuration}} минут.
            </p>
            <p class="text-justify">
                Счастливого пути!
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TripCalculator',
    data() {
        return {
            route: '',
            time1: '',
            time2: '',
            ABdefault: [
                new Date(2021, 7, 21, 18, 0),
                new Date(2021, 7, 21, 18, 30),
                new Date(2021, 7, 21, 18, 45),
                new Date(2021, 7, 21, 19, 0),
                new Date(2021, 7, 21, 19, 15),
                new Date(2021, 7, 21, 21, 0),
            ],
            BAdefault: [
                new Date(2021, 7, 21, 18, 30),
                new Date(2021, 7, 21, 18, 45),
                new Date(2021, 7, 21, 19, 0),
                new Date(2021, 7, 21, 19, 15),
                new Date(2021, 7, 21, 19, 35),
                new Date(2021, 7, 21, 21, 50),
                new Date(2021, 7, 21, 21, 55),
            ],
            tripDuration: 50,
            priceOneWay: 700,
            priceTwoWays: 1200,
            quantity: 0,
            sum: 0,
            msg: "",
            backTripInfo: {
                startTime: "",
                finishTime: ""
            },
            startTime: "",
            finishTime: ""
        };
    },
    computed: {
        getTimeZoneDiff: function () { 
            return  -(new Date()).getTimezoneOffset() - 180;
        }
    },
    methods: {
        hideRes: function () {
            document.getElementsByClassName("res")[0].style.display = "none";
        },
        addMinutes: function (currentTime, interval) {
            return new Date(currentTime.setMinutes(currentTime.getMinutes() + interval));    
        },
        localTime: function (time) {
            return this.addMinutes(time, this.getTimeZoneDiff);
        },
        removeClass: function(className) {
            let elements = Array.prototype.slice.call( document.getElementsByClassName(className));
            for (let i=0, l=elements.length; i<l; i++) {
                let el = elements[i];
                el.className = el.className.replace(new RegExp('(^|\\s+)' + className + '(\\s+|$)', 'g'), '$1');
            }
        },
        getBackTime: function (selected) {
            switch(selected) {
                case "18:30(из B в A)": return new Date(this.BAdefault[0]);
                case "18:45(из B в A)": return new Date(this.BAdefault[1]);
                case "19:00(из B в A)": return new Date(this.BAdefault[2]);
                case "19:15(из B в A)": return new Date(this.BAdefault[3]);
                case "19:35(из B в A)": return new Date(this.BAdefault[4]);
                case "21:50(из B в A)": return new Date(this.BAdefault[5]);
                case "21:55(из B в A)": return new Date(this.BAdefault[6]);
            }            
        },
        getForwardTime: function (selected) {
            switch(selected) {
                case "18:00(из A в B)": return new Date(this.ABdefault[0]);
                case "18:30(из A в B)": return new Date(this.ABdefault[1]);
                case "18:45(из A в B)": return new Date(this.ABdefault[2]);
                case "19:00(из A в B)": return new Date(this.ABdefault[3]);
                case "19:15(из A в B)": return new Date(this.ABdefault[4]);
                case "21:00(из A в B)": return new Date(this.ABdefault[5]);
            }            
        },
        switchOptions: function() {
            this.hideRes();
            if (this.route == "из A в B" || this.route == "из A в B и обратно в А") {
                document.getElementById("time1").disabled = false;
                document.getElementById("time2").disabled = true;
            }
            else if (this.route == "из B в A") { 
                this.removeClass("hideOption");
                document.getElementById("time1").disabled = true;
                document.getElementById("time2").disabled = false;
            }
        },
        backRoute: function (e) {
            let selected = e.target.value;
            this.hideRes();
            if (this.route != "из A в B и обратно в А") {
                return;
            }  
            let forwardTime = this.getForwardTime(selected);
            let backTime = this.addMinutes(forwardTime, this.tripDuration);
            let options = document.getElementById("time2").children;
            for (let i=0; i<this.BAdefault.length; i++) {
                if (backTime >= this.BAdefault[i]) {
                    options[i].classList.add("hideOption");
                }
                else {
                    options[i].classList.remove("hideOption");
                }
            }
            document.getElementById("time2").disabled = false;
        },
        validateQuantity: function (e) {
            let num = e.target.value;
            if (!Number.isInteger(parseInt(num)) || num < 1) {
                this.msg = "Неверное количество билетов!";
                document.getElementById("calc").disabled = true;
                this.hideRes();
                return false;
            }
            else {
                this.msg = "";
                document.getElementById("calc").disabled = false;
                return true;
            }
        },
        calcSum: function () {
            let value = "";
            this.hideRes();
            this.quantity = document.getElementById("quantity").value;
            if (this.route == "из A в B" || this.route == "из A в B и обратно в А") {
                value = document.getElementById("time1").value;
                this.startTime = this.getForwardTime(value);
                this.finishTime = this.addMinutes(new Date(this.startTime), this.tripDuration);
            }
            else if (this.route == "из B в A") {
                value = document.getElementById("time2").value;
                this.startTime = this.getBackTime(value);
                this.finishTime = this.addMinutes(new Date(this.startTime), this.tripDuration);
            }
            if (value == "" || this.route == "" || (this.route == "из A в B и обратно в А" && document.getElementById("time2").value == "")) {
                this.msg = "Проверьте ввод!";
                return;
            }
            this.msg = "";
            if (this.route == "из A в B" || this.route == "из B в A") {
                this.sum = this.quantity * this.priceOneWay;
            }
            else {
                this.sum = this.quantity * this.priceTwoWays;
                value = document.getElementById("time2").value;
                this.backTripInfo.startTime = this.getBackTime(value);
                this.backTripInfo.finishTime = this.addMinutes(new Date(this.backTripInfo.startTime), this.tripDuration);
            }
            document.getElementsByClassName("res")[0].style.display = "block";
        }
    },
    created() {
        for (let i=0; i<this.ABdefault.length; i++) {
            this.ABdefault[i] = this.addMinutes(this.ABdefault[i], this.getTimeZoneDiff);
        }
        for (let i=0; i<this.BAdefault.length; i++) {
            this.BAdefault[i] = this.addMinutes(this.BAdefault[i], this.getTimeZoneDiff);
        }
    }
};
</script>

<style>

label {
    margin: 5px 10px;
}

option, p {
    font-weight: 600;
}

option.hideOption, div.res {
    display: none;
}

.row {
    margin-bottom: 15px;
}

.error {
    color: red;
}
</style>