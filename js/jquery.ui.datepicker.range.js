
$.datepicker._defaults.onAfterUpdate = null;

var datepicker__updateDatepicker = $.datepicker._updateDatepicker;
$.datepicker._updateDatepicker = function( inst ) {
    datepicker__updateDatepicker.call( this, inst );

    var onAfterUpdate = this._get(inst, 'onAfterUpdate');
    if (onAfterUpdate)
        onAfterUpdate.apply((inst.input ? inst.input[0] : null),
           [(inst.input ? inst.input.val() : ''), inst]);
}



$(function() {

    var cur = -1, prv = -1;

    $(this).find('.DatePickerRange div').each(function() {



        $(this).datepicker({
            //numberOfMonths: 3,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,

            beforeShowDay: function (date) {
                return [true, ((date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
            },

            onSelect: function (dateText, inst) {
                var d1, d2;

                prv = cur;
                cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
                if (prv == -1 || prv == cur) {
                    prv = cur;
                    $(this).parent().find('input').val(dateText);
                } else {
                    d1 = $.datepicker.formatDate('dd/mm/yy', new Date(Math.min(prv, cur)), {});
                    d2 = $.datepicker.formatDate('dd/mm/yy', new Date(Math.max(prv, cur)), {});
                    $(this).parent().find('input').val(d1 + ' - ' + d2);
                }
            },

            onChangeMonthYear: function (year, month, inst) {
                //prv = cur = -1;
            },

            onAfterUpdate: function (inst) {
                $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + DTDoneText + '</button>')
                   .appendTo($(this).find('.ui-datepicker-buttonpane'))
                   .on('click', function () { $(this).parent().parent().hide(); });
            }
        })

        $(this).position({
            my: 'left top',
            at: 'left bottom',
            of: $(this).parent().find('input')
        })

        $(this).attr('style', 'position:absolute !important');

        $(this).hide();


    })



    $(this).find('.DatePickerRange input').each(function() {

        $(this).on('focus', function (e) {
        var v = this.value,
            d;

        try {
            if ( v.indexOf(' - ') > -1 ) {
                d = v.split(' - ');

                prv = $.datepicker.parseDate('dd/mm/yy', d[0]).getTime();
                cur = $.datepicker.parseDate('dd/mm/yy', d[1]).getTime();

            } else if ( v.length > 0 ) {
                prv = cur = $.datepicker.parseDate('dd/mm/yy', v).getTime();
            }
        } catch ( e ) {
            cur = prv = -1;
        }

        if ( cur > -1 )
            $(this).parent().find('div').datepicker('setDate', new Date(cur));

        $(this).parent().find('div').datepicker('refresh').show();
    });

})

});

