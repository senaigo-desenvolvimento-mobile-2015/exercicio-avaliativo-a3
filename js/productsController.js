/**
 * Controller produtos
 */
$app.controller('productsController',function ($scope,$http,$routeParams,$location) {
    var resorces = "products";
    var resorce = "product";
    $scope.page_title = "Produtos";
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
     * Consulta fornecedores para relacionamento
     */
    function loadSuppliers(){
        $http.get($scope.server("/suppliers")).success(function(data){
			$scope.suppliers = {
                availableOptions: data
            };
		});
    }
    /**
     * Consulta fornecedores para relacionamento
     */
    function loadCategories(){
        $http.get($scope.server("/categories")).success(function(data){
			$scope.categories = {
                availableOptions: data
            };
		});
    }
    /**
     * Consulta por id
     */
	$scope.loadRow = function(){
		if ($routeParams.id !== null){
			$scope.showLoader();
			$http.get(
                $scope.server("/"+resorce+"/"+$routeParams.id)
            ).success(function(data){
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
			$scope.row.productID = null;
			$scope.row.isUpdate = false;
			$scope.hideLoader();
		}
        loadSuppliers();
        loadCategories();
	};
    /**
     * Salva um registro
     */
	$scope.save = function(){
		$scope.showLoader();
		$http.post(
            $scope.server("/"+resorce),$scope.row
        ).success(function(data){
			alert("Salvo com sucesso");
			$scope.row.isUpdate = true;
			$scope.hideLoader();
			$location.path("/"+resorces);
		}).error(function(data){
            $scope.hideLoader();
            alert("Erro ao tentar salvar o item\n" + data.error.text);
            $location.path("/"+resorces);
        });
	};
    /**
     * Exclui um registro por id
     */
	$scope.del = function(){
		if (confirm("Deseja excluir " + $scope.row.productID + "?")){
			$http.delete(
                $scope.server("/"+resorce+"/"+$routeParams.id)
            ).success(function(s){
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
