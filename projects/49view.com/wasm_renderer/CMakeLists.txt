cmake_minimum_required (VERSION 2.6)
include(../../../event_horizon/native/CMakeLists.txt NO_POLICY_SCOPE)
project(wasm_renderer)

set(BUILD_FROM_SOURCE TRUE)
#if ( NOT EMSCRIPTEN )
    set(_USE_IMGUI_ TRUE)
#endif()
compile( core lua graphics poly render_scene_graph converters )
compile_submodule( eh_arch/controller )
compile_submodule( eh_arch/render )
compile_submodule( eh_arch/models )
compile_local( sources )


add_executable(${PROJECT_NAME} ${BUILD_FILES})

linker(${PROJECT_NAME} "${LIBS}")

install (TARGETS ${PROJECT_NAME} DESTINATION /usr/local/bin )
