/**
 * Controller fornecedores
 */
$app.controller('suppliersController',function ($scope,$http,$routeParams,$location) {
    var resorces = "suppliers";
    var resorce = "supplier";
    $scope.page_title = "Fornecedores";
	//listagem
	$scope.rows = null;
	$scope.row = null;
	//Pagination
	$scope.currentPage = 0;
	$scope.pageSize = 15;
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
        console.log($routeParams.id);
		if (typeof $routeParams.id !== "undefined"){
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
			$scope.row.supplierID = null;
			$scope.row.isUpdate = false;
			$scope.hideLoader();
		}
	};
    /**
     * Salva um registro
     */
	$scope.save = function(){
		$scope.showLoader();
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
		if (confirm("Deseja excluir " + $scope.row.supplierID + "?")){
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
});
