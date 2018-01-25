

 var SheetJSImportDirective = function() {
  return {
    scope: { 
    },
    link: function ($scope, $elm, $attrs) {
      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();

        reader.onload = function (e) {
          /* read workbook */
          var bstr = e.target.result;
          var workbook = XLSX.read(bstr, {type:'binary'});

          var first_sheet_name = workbook.SheetNames[0];
          var excelInJSON  = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);
                // use scope.$emit to pass it to controller
          $scope.$emit('notification', excelInJSON);
        
          
        };

        reader.readAsBinaryString(changeEvent.target.files[0]);
      });
    }
  };
};
 
angular
.module('app').directive("importSheetJs", [SheetJSImportDirective]);