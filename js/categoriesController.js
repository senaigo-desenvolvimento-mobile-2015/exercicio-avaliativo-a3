/**
 * Controller categorias
 */
$app.controller('categoriesController',function ($scope,$http,$routeParams,$location, $base64) {
    var resorces = "categories";
    var resorce = "category";
    $scope.page_title = "Categoria de produtos";
	//listagem
	$scope.rows = null;
	$scope.row = null;
	//Pagination
	$scope.currentPage = 0;
	$scope.pageSize = 15;
    $scope.updatePicture = true;
    /**
     * Número de páginas
     */
	$scope.numberOfPages =function(){
		return Math.ceil($scope.rows.length/$scope.pageSize);
	};
    /**
     * Consulta todos os registros
     */
	$scope.loadAll = function(){
		$scope.showLoader();
		$http.get($scope.server("/"+resorces)).success(function(data){
			$scope.rows = data;
			$scope.hideLoader();
		});
	};
    /**
     * Consulta por id
     */
	$scope.loadRow = function(){
		if ($routeParams.id!==null){
			$scope.showLoader();
			$http.get($scope.server("/"+resorce+"/"+$routeParams.id)).success(function(data){
				$scope.row = data;
				$scope.row.isUpdate = true;
				$scope.hideLoader();
			}).error(function(data){
                $scope.hideLoader();
                alert("Erro ao consultar os item\n" + data.error.text);
                $location.path("/"+resorces);
            });
		}else{
			$scope.row = {};
			$scope.row.categoryID = null;
			$scope.row.isUpdate = false;
			$scope.hideLoader();
		}
	};
    /**
     * Salva um registro
     */
	$scope.save = function(){
		$scope.showLoader();
        $scope.row.picture = $scope.imageStrings[0];
		$http.post($scope.server("/"+resorce),$scope.row).success(function(data){
			alert("Salvo com sucesso");
			$scope.row.isUpdate = true;
			$scope.hideLoader();
			$location.path("/"+resorces);
		}).error(function(data){
            $scope.hideLoader();
            console.log(data.error.text);
            alert("Erro ao tentar salvar o item\n" + data.error.text);
        });
	};
    /**
     * Exclui um registro por id
     */
	$scope.del = function(){
		if (confirm("Deseja excluir " + $scope.row.categoryID + "?")){
			$http.delete($scope.server("/"+resorce+"/"+$routeParams.id)).success(function(s){
				$scope.hideLoader();
				alert("Excluído com sucesso");
				$location.path("/"+resorces);
			}).error(function(data){
                $scope.hideLoader();
                alert("Erro na exclusão do item\n" + data.error.text);
                $location.path("/"+resorces);
            });
		}
	};

    $scope.imageStrings = [];
    $scope.processFiles = function(files){
        $scope.updatePicture = false;
        angular.forEach(files, function(flowFile, i){
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var uri = event.target.result;
                $scope.imageStrings[i] = uri;
            };
            fileReader.readAsDataURL(flowFile.file);
        });
    };
});
